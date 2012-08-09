describe("Router", function () {

    // Declare variables for this spec
    var mockSite;
    var mockExperiments;
    
    beforeEach(function () {
        // Set up the thing we're testing
        this.router = new AppRouter();

        // Stub out/Spy on the changePage function, so that it doesn't
        // do anything
        spyOn(this.router, "changePage");
        
        // Set up a spy we'll use to check the router is working properly
        this.routerSpy = jasmine.createSpy();

        // Stub out the views our router should call
        window.HomeView = Backbone.View.extend({});
        window.VisualisationView = Backbone.View.extend({});
        window.SiteView = Backbone.View.extend({});
        window.ExperimentView = Backbone.View.extend({});

        // Stub out the models we'll use to pass to our views
        window.Site = Backbone.RelationalModel.extend({});

        // Stub out the Collections our router should pass to the View
        window.Exercise = Backbone.Collection.extend({});
        window.ExperimentCollection = Backbone.Collection.extend({});

        // Create the Sites collection we use to store the whole exercise
        // and Mock/Spy the methods we'll call so we can control the output
        window.Sites = new Exercise();

        mockExperiments = new ExperimentCollection();
        // Mock Experiments.get to always return 1 experiment with id=1
        spyOn(mockExperiments, "get").andCallFake(function (experimentId){
            return {
                id:1,
                userId: "Group1",
                groupId: "Group1",
                datetime: "2012-01-01",
                experimentType: "Wet Width",
                notes: "",
                data: {
                    measurement:1.9,
                    unitOfMeasurement:"m"     
                }
            };
        });

        mockSite = new Site();
        // Mock Site.get to return the mock experiments
        spyOn(mockSite, "get").andCallFake(function(attributeName) {
            return mockExperiments;
        });

        // Mock Sites to always return a site
        spyOn(window.Sites, "get").andCallFake(function (siteId) {
            return mockSite;
        });
        
        // Start Backbone routing in a way that won't break when we try
        // to start it with every test, and will get us into a known
        // place to start our tests from
        try {
            Backbone.history.start({silent:true});
        } catch(e) {}

        this.router.navigate("elsewhere");
    });

    // Homepage

    it("Should route to the homepage with a blank hash", function () {
        // Set our spy to spy on the router event we're interested in
        this.router.bind("route:home", this.routerSpy);

        // force the router to go to the homepage
        this.router.navigate("", true);

        // Expect the home event to have been called once
        expect(this.routerSpy).toHaveBeenCalled();
        expect(this.routerSpy.callCount).toBe(1);
    });

    it("Should pass the right parameters to the homepage", function (){
        // force the router to go to the homepage
        this.router.navigate("", true);

        // Expect the changePage to have been called with the right params
        expect(this.router.changePage).toHaveBeenCalledWith(jasmine.any(Object), "home");
    });

    // Visualisation Page

    it("Should route to the visualisation page on #visualisation", function () {
        // Set our spy to spy on the router event we're interested in
        this.router.bind("route:visualisation", this.routerSpy);

        // force the router to go to the visualisation page
        this.router.navigate("#visualisation", true);

        // Expect the visualisation event to have been called once
        expect(this.routerSpy).toHaveBeenCalled();
        expect(this.routerSpy.callCount).toBe(1);
    });

    it("Should pass the right parameters to the visualisation page", function (){
        // force the router to go to the visualisation page
        this.router.navigate("#visualisation", true);

        // Expect the changePage to have been called with the right params
        expect(this.router.changePage).toHaveBeenCalledWith(jasmine.any(Object), "visualisation");
    });

    // Site page

    it("Should route to the sites page on #site/1", function () {
        // Set our spy to spy on the router event we're interested in
        this.router.bind("route:site", this.routerSpy);

        // force the router to go to sites/1
        this.router.navigate("#site/1", true);

        // Expect the sites event to have been called once
        expect(this.routerSpy).toHaveBeenCalled();
        expect(this.routerSpy.callCount).toBe(1);
    });

    it("Should pass the right parameters to the site page", function (){
        // force the router to go to the homepage
        this.router.navigate("#site/1", true);

        // Expect window.Sites.get() to have been called with an id of 1
        expect(window.Sites.get).toHaveBeenCalledWith('1');

        // Expect the changePage to have been called with the right params
        expect(this.router.changePage).toHaveBeenCalledWith(jasmine.any(Object), "site1");
    });

    // Experiment page
    
    it("Should route to the experiment page on #site/1/experiment/1", function () {
        // Set our spy to spy on the router event we're interested in
        this.router.bind("route:experiment", this.routerSpy);

        // force the router to go to sites/1/experiment/1
        this.router.navigate("#site/1/experiment/1", true);

        // Expect the sites event to have been called once
        expect(this.routerSpy).toHaveBeenCalled();
        expect(this.routerSpy.callCount).toBe(1);
    });

    it("Should pass the right parameters to the experiment page", function (){
        // force the router to go to the homepage
        this.router.navigate("#site/1/experiment/1", true);

        // Expect window.Sites.get() to have been called with an id of 1
        expect(window.Sites.get).toHaveBeenCalledWith('1');

        // Expect mockSite.get() to have been called with 'experiments'
        expect(mockSite.get).toHaveBeenCalledWith('experiments');

        // Expect mockExperiments.get() to have been called with an id of 1
        expect(mockExperiments.get).toHaveBeenCalledWith('1');

        // Expect the changePage to have been called with the right params
        expect(this.router.changePage).toHaveBeenCalledWith(jasmine.any(Object), "site1-exercise1");
    });

});
