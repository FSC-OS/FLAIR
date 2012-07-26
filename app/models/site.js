// Site Model
// ----------------

// Model for a site where experiments happen
window.Site = Backbone.Model.extend({

    defaults: function() {
        return {
            location: {},
        }
    },

    // Function to say whether all the experiments in this site are complete
    isComplete: function() {
        // Optimistic for the moment
        return true;
    },

    // Function to clear this experiment
    clear: function() {
      this.destroy();
    }

});