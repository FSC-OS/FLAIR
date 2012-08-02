// Experiment Model
// ----------------

// Model for containing the data of an experiment.
window.Experiment = Backbone.RelationalModel.extend({

    // Function to say whether this experiment is complete
    isComplete: function() {
        // Optimistic for the moment
        return true;
    },

    // Function to clear this experiment
    clear: function() {
      this.destroy();
    }

});