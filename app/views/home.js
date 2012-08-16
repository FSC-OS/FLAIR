// Home View
// ---------

// The home view is the top level piece of UI of our app
window.HomeView = Backbone.View.extend({

  template: _.template($("#home").html()),

  initialize: function() {
    this.collection.on("reset", this.render, this);
  },
  
  render: function() {
    $(this.el).html(this.template({sites: this.collection.toJSON()}));
    // TODO - this is less than ideal because jquery mobile says not to
    // do it twice, but so far no bad things seem to happen.
    // When this: https://github.com/jquery/jquery-mobile/issues/2215
    // has been resolved, we should be able to do something properly.
    // Force jquery mobile to refresh all it's enhancements
    $(this.el).trigger("pagecreate");
    return this;
  },
  
  events: {
    "vclick a#bootstrap": "bootstrap"
  },
  
  bootstrap: function() {
  	window.bootStrapSites(this.collection);
  }
});