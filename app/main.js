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
        this.changePage(new HomeView(), 'home');
    },

    visualisation:function () {
        this.changePage(new VisualisationView(), 'visualisation');
    },

    changePage:function (page, id) {
        $(page.el).attr('data-role', 'page');
        $(page.el).attr('id', id);
        page.render();
        $('body').append($(page.el));
        $.mobile.changePage($(page.el), {changeHash:false, transition: $.mobile.defaultPageTransition});
    }

});

/**
 * function to start the app
 */
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