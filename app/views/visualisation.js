window.VisualisationView = Backbone.View.extend({

    template:_.template($('#visualisation').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});