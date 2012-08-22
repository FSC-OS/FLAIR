// Experiments Collection
// ----------------------

// Collection of Experiment objects which need to be undertaken.
// Each site has a collection of these.
;(function(FLAIR, Backbone, _, $) {
	_.extend(FLAIR, {
		ExperimentCollection: Backbone.Collection.extend({
		    model: FLAIR.Experiment    
		})
	});
})(FLAIR, Backbone, _, $);