/**
* Router
* An extended version of Backbone's Router class which provides
* the 'glue' that combines our models and views into an app that
* responds to url changes. Uses jQuery Mobile's manual "changePage"
* function to actually do the changing, so that jQM understands 
* what Backbone is playing at.
*/
;(function(FLAIR, Backbone, _, $) {
    _.extend(FLAIR, {
        AppRouter: Backbone.Router.extend({

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
                this.changePage(new FLAIR.HomeView({collection: FLAIR.Sites}), "home");
            },

            visualisation:function () {
                this.changePage(new FLAIR.VisualisationView({collection: FLAIR.Sites}), "visualisation");
            },

            site:function (siteId) {
                var pageId = "site" + siteId;
                var site = FLAIR.Sites.get(siteId);
                this.changePage(new FLAIR.SiteView({model: site}), pageId);
            },

            experiment:function(siteId, experimentId) {
                var pageId = "site" + siteId + "-experiment" + experimentId;
                
                var site = FLAIR.Sites.get(siteId);
                var experiments = site.get('experiments');
                var experiment = experiments.get(experimentId);
                // Use the order property to determine paging
                var order = experiment.get("order");

                var previous = (order > 0) ? "#site/" + siteId + "/experiment/" + (parseInt(experimentId) - 1) : "#site/" + siteId;
                var next = (order < (experiments.length - 1)) ? "#site/" + siteId + "/experiment/" + (parseInt(experimentId) + 1) : "#site/" + siteId;

                this.changePage(
                    new FLAIR.ExperimentView(
                        {
                            model: experiment,
                            pageId: pageId,
                            previous: previous,
                            next: next
                        }
                    ),
                    pageId
                );
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

        })
    });
})(FLAIR, Backbone, _, $);