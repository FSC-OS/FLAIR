/**
* Router
* Override Backbone's router so that it uses jQuery Mobile's changePage() 
* method to change pages
*/
window.AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "visualisation":"visualisation",
        "site/:siteid/experiment/:experimentid":"experiment",
        "site/:siteid":"site"
    },

    initialize:function () {
        this.firstPage = true;
    },

    home:function () {
        this.changePage(new HomeView({model: Sites}), 'home');
    },

    visualisation:function () {
        this.changePage(new VisualisationView({model: Sites}), 'visualisation');
    },

    site:function (siteid) {
        this.changePage(
            new SiteView({model: Sites.get(siteid)}),
            'site' + siteid
        )
    },

    experiment:function(siteid, exerciseid) {
        this.changePage(
            new ExperimentView({model: Sites.get(siteid).get('experiments').get(exerciseid)}),
            'site' + siteid + "-exercise" + exerciseid
        )
    },

    changePage:function (page, id) {
        $(page.el).attr("data-role", "page");
        $(page.el).attr("id", id);
        page.render();
        $("body").append($(page.el));
        $.mobile.changePage(
            $(page.el),
            {
                changeHash:false, 
                transition: $.mobile.defaultPageTransition
            }
        );
    }

});