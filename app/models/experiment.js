// Experiment Model
// ----------------

// Model for containing the data of an experiment.
window.Experiment = Backbone.RelationalModel.extend({

    // Function to say whether this experiment is complete
    isComplete: function() {
        var input = this.get('data').measurement;
        if(_.isNull(input) || _.isUndefined(input)) {
            return false;
        }
        else if((_.isObject(input) || _.isArray(input)) && _.isEmpty(input)) {
            return false
        }
        else {
            return true;
        }
    },

    // Function to clear this experiment
    clear: function() {
      this.destroy();
    }

});