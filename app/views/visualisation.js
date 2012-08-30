// Visualisation View
// ------------------

// A separate view which takes the Experiments collection
// and displays a visualisation of it
;(function(FLAIR, Backbone, _, $) {

    _.extend(FLAIR, {

        VisualisationView: Backbone.View.extend({

            template:_.template($("#visualisation").html()),

            plottedCharts: [],

            initialize: function() {
                // Bind to the global window resize and orientationchange
                // events to redraw everything on those events
                // From: http://stackoverflow.com/questions/9110060/how-do-i-add-a-resize-event-to-the-window-in-a-view-using-backbone
                $(window).on("resize.FLAIR orientationchange.FLAIR", _.bind(this.resize, this));
            },

            render:function (eventName) {
                
                // Render the basic template
                $(this.el).html(this.template({sites: this.collection.toJSON()}));

                // Extract the data that is supposed to be charted from each site
                var that = this;
                var charts = [];
                var chartIds = [];
                _.each(this.collection.models, function(site) {
                    var chart = {};
                    var chartId = "site-" + site.id + "-chart";

                    // Store the data for this chart
                    chart.id = chartId;
                    // Find the experiment models which are supposed to be visualised
                    chart.models = _.filter(site.get("experiments").models, function(experiment) {
                        return !_.isUndefined(experiment.attributes.visualisation);
                    });
                    // Give each chart the site it's in too, to give more data for visualisation
                    chart.site = site;
                    
                    charts.push(chart);
                    chartIds.push(chartId);
                });

                // Build a DOM element for each of the charts we've found data for
                _.each(chartIds, function(chartId){
                    var chartDiv = that.make("div", {"id": chartId});
                    $(that.el).find("div[data-role='content']").append(chartDiv);
                });

                // Work out what visualisation to use
                // TODO - this doesn't feel right, we need to set this on the whole
                // Exercise, not on each site, unless we're going to allow sites to
                // be visualised differently, and then we'll struggle with things
                // like where we need to calculate the max of all sites in the
                // visualisation code
                var visualisationFunction = this.collection.models[0].get("visualisation");

                // Call the charting function
                this.renderCharts(charts, visualisationFunction);

                return this;
            },

            renderCharts: function(charts, visualisationFunction) {
                // TODO - this is a bit hacky, but otherwise the chart won't have a div to render
                // to, and so will fail. This makes it happen after all the real rendering
                // has taken place. A better solution will require a charting lib that
                // doesn't need this, which I couldn't find in the time.
                setTimeout(function () {
                    plottedCharts = FLAIR.visualisations[visualisationFunction](charts);
                    $("#visualisation-loader").remove();
                }, 0);
            },

            resize: function() {
                // resize/orientationchange gets fired a lot, even when you just maximise/
                // minimise a window, so we call our function after a timeout
                // to hopefully wait until it's fully finished before doing the
                // expensive redrawing. 
                // If we get called again before then this just resets the timeout
                // and starts over.
                var that = this;
                clearTimeout(that.resizeTimeoutId);
                that.resizeTimeoutId = setTimeout(function() {
                    that.render();
                    $(that.el).trigger("pagecreate");
                }, 200);
            },

            remove: function() {
                // unbind from the window resize and orientationchange events
                // to avoid leaking
                $(window).off("resize.FLAIR orientationchange.FLAIR");
                Backbone.View.prototype.remove.call(this);
            }
        })
    });
})(FLAIR, Backbone, _, $);