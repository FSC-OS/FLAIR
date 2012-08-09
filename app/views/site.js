// Site View
// ------------------

// A separate view which takes a Site model and displays it as a list
// of the experiments contained within
window.SiteView = Backbone.View.extend({

    template:_.template($("#site").html()),

    render:function (eventName) {
        $(this.el).html(this.template({site: this.model.toJSON(), complete: this.options.complete}));
        return this;
    }
});