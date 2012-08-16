// Home View
// ---------

// The home view is the top level piece of UI of our app
window.HomeView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('change', this.render, this);
 	}, 

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
  }
});