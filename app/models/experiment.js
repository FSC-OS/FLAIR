// Experiment Model
// ----------------

// Model for containing the data of an experiment.
;(function() {
	_.extend(window.FLAIR, {
		Experiment: Backbone.RelationalModel.extend({
		    // Function to clear this experiment
		    clear: function() {
		      this.destroy();
		    }
		})
	});
})();