// Home View
// ---------

// The home view is the top level piece of UI of our app
window.HomeView = Backbone.View.extend({

    template: _.template($('#home').html()),

    render: function() {
        $(this.el).html(this.template({sites: this.model.toJSON()}));
        return this;
    }
});