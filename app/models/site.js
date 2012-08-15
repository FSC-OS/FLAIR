// Site Model
// ----------------

// Model for a site where experiments happen
window.Site = Backbone.RelationalModel.extend({

    relations: [{
        type: Backbone.HasMany,
        key: "experiments",
        relatedModel: "Experiment",
        collectionType: "ExperimentCollection",
        reverseRelation: {
            key: "site",
        }
    }],

    // Function to say whether all the experiments in this site are complete
    isComplete: function() {
        return this.get("experiments").all(function(experiment){
            return experiment.isComplete();
        });
    },

    // Function to clear this experiment
    clear: function() {
      this.destroy();
    }

});