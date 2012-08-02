// Site Model
// ----------------

// Model for a site where experiments happen
window.Site = Backbone.RelationalModel.extend({

    relations: [{
        type: Backbone.HasMany,
        key: 'experiments',
        relatedModel: 'Experiment',
        collectionType: 'ExperimentCollection',
        reverseRelation: {
            key: 'site',
            // Include the whole of each Experiment in the Site's JSON.
            // We need to do this so that we can serialise our
            // collection of Sites and get all the data in one go
            includeInJSON: true
        }
    }],

    // Function to say whether all the experiments in this site are complete
    isComplete: function() {
        return this.get('experiments').all(function(experiment){
            return experiment.isComplete();
        });
    },

    // Function to clear this experiment
    clear: function() {
      this.destroy();
    }

});