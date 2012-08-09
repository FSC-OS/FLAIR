// Experiment View
// ------------------

// A view which takes an Experiment model and displays it as a dump
// of the JSON fields within
window.ExperimentView = Backbone.View.extend({

    template:_.template($("#experiment").html()),

    render:function (eventName) {
        // TODO - how do we pass next/back links around - should
        // we calculate them here, or in the router/main.js
        // and pass them in?
        $(this.el).html(this.template({experiment: this.model.toJSON()}));
        return this;
    }
});