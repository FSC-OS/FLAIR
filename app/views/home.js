// Home View
// ---------

// The home view is the top level piece of UI of our app
window.HomeView = Backbone.View.extend({

  template: _.template($("#home").html()),
  
  render: function() {
    $(this.el).html(this.template({sites: this.collection.toJSON()}));
    return this;
  },
  
  events: {
    "vclick a#bootstrap": "bootstrap"
  },
  
  bootstrap: function() {
  	window.bootStrapSites(this.collection);
    // TODO - this is very bad, but if we don't actually "changePage"
    // I can't make jQuery mobile reload the styling on all the elements
    // we need it to, so the page is broken.
    app.home();
  }
});