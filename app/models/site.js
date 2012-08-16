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

    // Function to clear this experiment
    clear: function() {
      this.destroy();
    }

});