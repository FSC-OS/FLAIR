/**
* Router
* Override Backbone"s router so that it uses jQuery Mobile"s changePage() 
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
        this.changePage(new HomeView({model: Sites}), "home");
    },

    visualisation:function () {
        this.changePage(new VisualisationView({model: Sites}), "visualisation");
    },

    site:function (siteId) {
        var pageId = "site" + siteId;
        var site = Sites.get(siteId);
        this.changePage(
            new SiteView({
                model: site,
                complete: site.isComplete()
            }),
            pageId
        )
    },

    experiment:function(siteId, experimentId) {
        var pageId = "site" + siteId + "-experiment" + experimentId;
        
        var site = Sites.get(siteId);
        var experiments = site.get('experiments');
        var experiment = experiments.get(experimentId);

        var previous = (experimentId > 1) ? "#site/" + siteId + "/experiment/" + (parseInt(experimentId) - 1) : "#site/" + siteId;
        var next = (experimentId < experiments.length) ? "#site/" + siteId + "/experiment/" + (parseInt(experimentId) + 1) : "#site/" + siteId;

        this.changePage(
            new ExperimentView(
                {
                    model: experiment,
                    pageId: pageId,
                    previous: previous,
                    next: next
                }
            ),
            pageId
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