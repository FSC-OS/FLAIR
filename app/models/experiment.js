// Experiment Model
// ----------------

// Model for containing the data of an experiment.
;(function(FLAIR, Backbone, _, $) {
	_.extend(FLAIR, {
		Experiment: Backbone.RelationalModel.extend({
		    // Function to clear this experiment
		    clear: function() {
		      this.destroy();
		    }
		})
	});
})(FLAIR, Backbone, _, $);