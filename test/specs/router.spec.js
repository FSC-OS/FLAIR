describe("Router", function(){
    // Declare variables for this spec
    var mockSite;
    var mockExperiments;
    var mockExperiment;

    // Executed before every test nested below 
    beforeEach(function () {
        // Set up the thing we're testing
        this.router = new FLAIR.AppRouter();

        // Stub out/Spy on the changePage function, so that it doesn't
        // do anything
        spyOn(this.router, "changePage");
        
        // Set up a spy we'll use to check the router is working properly
        this.routerSpy = jasmine.createSpy();

        // Stub out the Collections our router should pass to the View
        FLAIR.Exercise = Backbone.Collection.extend({});

        // Create the Sites collection we use to store the whole exercise
        // and Mock/Spy the methods we'll call so we can control the output
        FLAIR.Sites = new FLAIR.Exercise();

        // Stub out the models we'll use to pass to our views
        FLAIR.Site = Backbone.RelationalModel.extend({
            // Mock out our custom isComplete function to always return true
            isComplete: function() {
                return true;
            }
        });

        // Start Backbone routing in a way that won't break when we try
        // to start it with every test, and will get us into a known
        // place to start our tests from
        try {
            Backbone.history.start({silent:true});
        } catch(e) {}

        this.router.navigate("elsewhere");

    });

    describe("Home Page Router", function () {    
        beforeEach(function () {
            // Stub out the views our router should call
            window.HomeView = Backbone.View.extend({});
        });

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
    });

    describe("Visualisation Page Router", function() {
        // Visualisation Page

        beforeEach(function() {
            window.VisualisationView = Backbone.View.extend({});
        });

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
    });

    describe("Site Page Router", function() {
        beforeEach(function() {
            window.SiteView = Backbone.View.extend({});

            mockSite = new FLAIR.Site();

            // Mock Sites to always return our mock site
            spyOn(FLAIR.Sites, "get").andCallFake(function (siteId) {
                return mockSite;
            });
        });

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
            // force the router to go to the sites page
            this.router.navigate("#site/1", true);

            // Expect FLAIR.Sites.get() to have been called with an id of 1
            expect(FLAIR.Sites.get).toHaveBeenCalledWith('1');

            // Expect the changePage to have been called with the right params
            expect(this.router.changePage).toHaveBeenCalledWith(jasmine.any(Object), "site1");
        });
    });

    describe("Experiment Page", function() {
        mockExperiment = new FLAIR.Experiment({
            id:0,
            order:0,
            site:0,
            userId: "Group1",
            groupId: "Group1",
            datetime: "2012-01-01",
            experimentType: "Wet Width",
            notes: "",
            data: {
                measurement:1.9,
                unitOfMeasurement:"m" 
            }    
        });

        mockExperiment2 = new FLAIR.Experiment({
            id:1,
            order:1,
            site:0,
            userId: "Group1",
            groupId: "Group1",
            datetime: "2012-01-01",
            experimentType: "Wet Width",
            notes: "",
            data: {
                measurement:1.9,
                unitOfMeasurement:"m" 
            }    
        });

        mockExperiment3 = new FLAIR.Experiment({
            id:2,
            order:2,
            site:0,
            userId: "Group1",
            groupId: "Group1",
            datetime: "2012-01-01",
            experimentType: "Wet Width",
            notes: "",
            data: {
                measurement:1.9,
                unitOfMeasurement:"m" 
            }    
        });

        beforeEach(function() {
            window.ExperimentView = Backbone.View.extend({});
            // Spy on the experiment view constructor
            this.experimentViewSpy = sinon.spy(window, "ExperimentView");

            FLAIR.ExperimentCollection = Backbone.Collection.extend({});

            mockExperiments = new FLAIR.ExperimentCollection([mockExperiment, mockExperiment2, mockExperiment3]);
            
            // Spy on experiments collection
            spyOn(mockExperiments, "get").andCallThrough();

            mockSite = new FLAIR.Site();
            // Mock Site.get to return the mock experiments
            spyOn(mockSite, "get").andCallFake(function(attributeName) {
                return mockExperiments;
            });

            // Mock Sites to always return our mock site
            spyOn(FLAIR.Sites, "get").andCallFake(function (siteId) {
                return mockSite;
            });
        });

        afterEach(function() {
            // Remove the spy on the ExperimentView constructor
            window.ExperimentView.restore();
        });
        
        it("Should route to the experiment page on #site/1/experiment/0", function () {
            // Set our spy to spy on the router event we're interested in
            this.router.bind("route:experiment", this.routerSpy);

            // force the router to go to sites/1/experiment/0
            this.router.navigate("#site/1/experiment/0", true);

            // Expect the sites event to have been called once
            expect(this.routerSpy).toHaveBeenCalled();
            expect(this.routerSpy.callCount).toBe(1);
        });

        it("Should pass the right parameters to the experiment page", function (){
            // force the router to go to the experiment page
            this.router.navigate("#site/1/experiment/0", true);

            // Expect FLAIR.Sites.get() to have been called with an id of 1
            expect(FLAIR.Sites.get).toHaveBeenCalledWith('1');

            // Expect mockSite.get() to have been called with 'experiments'
            expect(mockSite.get).toHaveBeenCalledWith('experiments');

            // Expect mockExperiments.get() to have been called with an id of 0
            expect(mockExperiments.get).toHaveBeenCalledWith('0');

            // Expect the changePage to have been called with the right params
            expect(this.router.changePage).toHaveBeenCalledWith(jasmine.any(Object), "site1-experiment0");
        });


        it("Should pass the right parameters on the first experiment", function() {

            this.router.navigate("#site/1/experiment/0", true);
            var expectedPreviousLink = "#site/1";
            var expectedNextLink = "#site/1/experiment/1";
            sinon.assert.calledWith(
                this.experimentViewSpy,
                {
                    model: mockExperiment,
                    pageId: "site1-experiment0", 
                    next: expectedNextLink, 
                    previous: expectedPreviousLink
                }
            );
        });

        it("Should pass the right parameters on the second experiment", function() {

            this.router.navigate("#site/1/experiment/1", true);
            var expectedPreviousLink = "#site/1/experiment/0";
            var expectedNextLink = "#site/1/experiment/2";
            sinon.assert.calledWith(
                this.experimentViewSpy,
                {
                    model: mockExperiment2,
                    pageId: "site1-experiment1", 
                    next: expectedNextLink, 
                    previous: expectedPreviousLink
                }
            );
        });

        it("Should pass the right parameters on the last experiment", function() {

            this.router.navigate("#site/1/experiment/2", true);
            var expectedPreviousLink = "#site/1/experiment/1";
            var expectedNextLink = "#site/1";
            sinon.assert.calledWith(
                this.experimentViewSpy,
                {
                    model: mockExperiment3,
                    pageId: "site1-experiment2", 
                    next: expectedNextLink, 
                    previous: expectedPreviousLink
                }
            );
        });

    });
});