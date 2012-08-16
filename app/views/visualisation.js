// Visualisation View
// ------------------

// A separate view which takes the Experiments collection
// and displays a visualisation of it
window.VisualisationView = Backbone.View.extend({

    template:_.template($("#visualisation").html()),

    render:function (eventName) {
        
        $(this.el).html(this.template({sites: this.collection.toJSON()}));

        var that = this;
        var charts = [];
        var max = 0;
        var chartDivIds = [];
        _.each(this.collection.models, function(site) {
        	var chart = {};
            var chartId = "site-" + site.id + "-chart";
            chartDivIds.push(chartId);
           	var experiments = site.get("experiments");
           	var wetWidthModel = experiments.models[0];
           	var depthModel = experiments.models[3];
            var wetWidth = wetWidthModel.get("data").measurement;
            max = wetWidth > max ? wetWidth : max;
            var depths = [
                depthModel.get("data").measurement1,
                depthModel.get("data").measurement2,
                depthModel.get("data").measurement3,
                depthModel.get("data").measurement4,
                depthModel.get("data").measurement5,
            ];
            chart.id = chartId;
            chart.wetWidth = wetWidth;
            chart.depths = depths;
            charts.push(chart);
        });

        _.each(chartDivIds, function(chartId){
        	var chartDiv = that.make("div", {"id": chartId});
        	$(that.el).find("div[data-role='content']").append(chartDiv);
        });

        setTimeout(function () {that.renderCharts(charts, max)}, 0);

        return this;
    },

    renderCharts: function(charts, max) {
    	_.each(charts, function(chart){
    		createCrossSection(chart.id, chart.wetWidth, chart.depths, max);
    	});
    }
});