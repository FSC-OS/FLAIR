// Visualisation View
// ------------------

// A separate view which takes the Experiments collection
// and displays a visualisation of it
window.VisualisationView = Backbone.View.extend({

    template:_.template($('#visualisation').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});