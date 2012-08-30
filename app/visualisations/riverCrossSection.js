;(function(FLAIR, Backbone, _, $) {

	_.extend(FLAIR, {
		// Add the crossSection visualisation to the 
		// FLAIR.visualisations object
		visualisations: _.extend(FLAIR.visualisations, {
				riverCrossSection: function(charts){
					return visualiseCrossSection(charts);
				}
		})
	});

	function visualiseCrossSection(charts) {
		// charts is an array of chart objects which look like:
		// {
		//   id: the div id for this chart
		//	 models: an array of Experiment Backbone models with data.measurement attributes to chart
		// }
		var maxWidth = 0, maxDepth = 0, plots = [];

		// Pull out the valid charts and add some values to them
		var validCharts = _.map(charts, function(chart, key, list){
			var localMaxDepth = 0;
			var wetWidthModel = _.find(chart.models, function(experiment) {
				return experiment.get("experimentType") === "Wet Width"; 
			});
			var depthMeasurementsModel = _.find(chart.models, function(experiment) {
				return experiment.get("experimentType") === "Wet Water Depth"; 
			}); 

			if(!_.isUndefined(wetWidthModel) && !_.isUndefined(depthMeasurementsModel)) {
				var wetWidth = parseInt(wetWidthModel.get("data").measurement, 10);
				var depthMeasurements = _.map(depthMeasurementsModel.get("data").measurement, function(depth) {
					return parseInt(depth, 10);
				});

				// Calculate a running maximum for the width so that we can graph
			    // all of them on the same scale for better science!
			    maxWidth = (wetWidth > maxWidth) ? wetWidth : maxWidth;
			    localMaxDepth = _.max(depthMeasurements);
			    maxDepth = (localMaxDepth > maxDepth) ? localMaxDepth : maxDepth;

			    return {
			    	id: chart.id,
			    	title: chart.site.get("location").name,
			    	wetWidth: wetWidth,
			    	depthMeasurements: depthMeasurements,
			    }
			}
		});
		
		// Draw them all
		return createAllCrossSections(validCharts, maxWidth, maxDepth);

	}

	function createAllCrossSections(charts, maxWidth, maxDepth) {
		// Create a chart for each of them
		var plots = [];
		_.each(charts, function(chart){
			plots.push(createCrossSection(chart.id, chart.title, chart.wetWidth, chart.depthMeasurements, maxWidth, maxDepth));
		});
		return plots;
	}

	function createCrossSection(chartDivId, title, wetWidth, depthMeasurements, maxWidth, maxDepth) {	
		// Draw a wicked graph
		var points = [];
		var wetWidthPoints = [];
		var depthPoints = [];
		var numDepthPoints = depthMeasurements.length;
		// There are two more sections than you think because people don't
		// start measuring at the edges
		var sectionWidth = wetWidth / (numDepthPoints + 2);
		// If this is a smaller section of the river, it's nicer to
		// offset the values a little so that the centre of each plot
		// is always lined up.
		var xOffset = (maxWidth - wetWidth) / 2;

		// Options for jQPlot
		var options = {
			title: title,
			axes: {
				xaxis: {
					min: 0,
					max: maxWidth
				},
				yaxis: {
					// Depth is plotted negative from 0, the top of the water,
					// so set the y axis max to -maxDepth plus an extra 10%
					// to make it look nice.
					min: -(maxDepth + (maxDepth / 10)),
					max: 0
				}
			},
			axesDefaults: {
				tickOptions: {
					formatString: "%.1f"
				}
			},
			seriesColors: ["#33CCFF","#996633"],
			seriesDefaults: {
				fill: true
			}
		};
		
		// Create x/y data points as two separate "series" so that we can
		// plot them and get jQPlot to colour in the space between them.

		// All measurements have an implied measurement of 0,0 at one side
		// of the river bank
		wetWidthPoints.push([xOffset + 0,0]);
		depthPoints.push([xOffset + 0,0]);

		// The points in the middle use the actual measurements
		for(var i = 0; i < numDepthPoints; i++) {
			var x = xOffset + (sectionWidth * (i+1));
			wetWidthPoints.push([x,0]);
			depthPoints.push([x, 0 - depthMeasurements[i]]);				
		}

		// All measurements also have an implied measurement of width,0
		// at the other side of the river bank
		wetWidthPoints.push([xOffset + wetWidth, 0]);
		depthPoints.push([xOffset + wetWidth, 0]);

		points.push(wetWidthPoints)
		points.push(depthPoints);
		
		return $.jqplot(chartDivId,points,options);
	}

})(FLAIR, Backbone, _, $);