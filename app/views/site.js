// Site View
// ------------------

// A separate view which takes a Site model and displays it as a list
// of the experiments contained within
;(function() {
	_.extend(window.FLAIR, {
		SiteView: Backbone.View.extend({

		    template: _.template($("#site").html()),

		    render:function (eventName) {
		    	// Sort the models by their order property
		    	var sortedModel = this.model.toJSON();
		    	sortedModel.experiments = _.sortBy(sortedModel.experiments, "order");
		        $(this.el).html(this.template({site: sortedModel}));
		        return this;
		    }

		})
	});
})();