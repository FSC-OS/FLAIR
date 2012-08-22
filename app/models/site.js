// Site Model
// ----------------

// Model for a site where experiments happen
;(function(FLAIR, Backbone, _, $) {
    _.extend(FLAIR, {
       Site: Backbone.RelationalModel.extend({
            relations: [{
                type: Backbone.HasMany,
                key: "experiments",
                relatedModel: "FLAIR.Experiment",
                collectionType: "FLAIR.ExperimentCollection",
                reverseRelation: {
                    key: "site",
                }
            }],

            // Function to clear this experiment
            clear: function() {
              this.destroy();
            }
        }) 
    });
})(FLAIR, Backbone, _, $);