/**
* Views
*/
window.HomeView = Backbone.View.extend({

  template:_.template($('#home').html()),

  render:function (eventName) {
    $(this.el).html(this.template());
    return this;
  }
});

window.VisualisationView = Backbone.View.extend({

  template:_.template($('#visualisation').html()),

  render:function (eventName) {
    $(this.el).html(this.template());
    return this;
  }
});

/**
* Router
* Override Backbone's router so that it uses jQuery Mobile's changePage() 
* method to change pages
*/
var AppRouter = Backbone.Router.extend({

  routes:{
    "":"home",
    "visualisation":"visualisation"
  },

  initialize:function () {
    this.firstPage = true;
  },

  home:function () {
    console.log('#home');
    this.changePage(new HomeView());
  },

  visualisation:function () {
    console.log('#visualisation');
    this.changePage(new VisualisationView());
  },

  changePage:function (page) {
    $(page.el).attr('data-role', 'page');
    page.render();
    $('body').append($(page.el));
    $.mobile.changePage($(page.el), {changeHash:false, transition: $.mobile.defaultPageTransition});
  }

});

var startApp = function() {
  app = new AppRouter();
  Backbone.history.start({ pushState: false });
};

/**
 * Start everything on document ready or deviceready depending on what system
 * we're on.
 */
if(window.Phonegap) {
  $(document).on('deviceready', startApp);
}
else {
  $(document).ready(startApp);
}