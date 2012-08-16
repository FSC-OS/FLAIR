// Experiment Model
// ----------------

// Model for containing the data of an experiment.
window.Experiment = Backbone.RelationalModel.extend({

    // Function to clear this experiment
    clear: function() {
      this.destroy();
    }

});