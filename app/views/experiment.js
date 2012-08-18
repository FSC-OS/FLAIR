// Experiment View
// ------------------

// A view which takes an Experiment model and displays it as a dump
// of the JSON fields within
;(function() {

    _.extend(window.FLAIR, {

        ExperimentView: Backbone.View.extend({

            template:_.template($("#experiment").html()),
            invalidFormMessage: "Looks like you missed something, can you check?",
            saveErrorMessage: "Something went wrong saving your data, can you try again?",
            form: {},

            render:function (eventName) {
                this.form = new Backbone.Form({
                    data: this.model.get("data"),
                    schema: this.model.get("schema")
                }).render();

                this.$el.html(this.template({
                    experiment: this.model.toJSON(),
                    pageId: this.options.pageId,
                    form: this.form.el,
                    previous: this.options.previous,
                    next: this.options.next
                }));

                var formContainer = this.$el.find("div[data-role='content'] > .form");
                formContainer.append(this.form.el);

                return this;
            },

            events: {
                "vclick a.next": "saveExperiment"
            },

            // Function to save the model from the form
            // Validates the form before trying to save the model with the new values 
            // from the form.
            // Returns true on success and false otherwise
            saveExperiment: function(event) {
                var errors = this.form.validate();

                if(errors !== null) {
                    alert(this.invalidFormMessage);
                    return false;
                }

                this.model.save(
                    {
                        data: this.form.getValue()
                    },
                    {
                        error: function(model, response) {
                            event.stopPropagation();
                            event.preventDefault();
                            alert(this.saveErrorMessage);
                        }
                    }
                );
            }
        })
    });
})();