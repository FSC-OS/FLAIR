// Experiments Collection
// ----------------------

// Collection of Experiment objects which need to be undertaken.
// Each site has a collection of these.
;(function() {
	_.extend(window.FLAIR, {
		ExperimentCollection: Backbone.Collection.extend({
		    model: FLAIR.Experiment    
		})
	});
})();