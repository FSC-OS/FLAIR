describe("Router", function () {
    
    beforeEach(function () {
        // Set up the thing we're testing
        this.router = new AppRouter();

        // Stub out/Spy on the changePage function, so that it doesn't
        // do anything
        spyOn(this.router, 'changePage');
        
        // Set up a spy we'll use to check the router is working properly
        this.routerSpy = jasmine.createSpy();

        // Stub out the view our router should call
        window.HomeView = Backbone.View.extend({});

        // Stub out the Collection our router should pass to the View
        window.Sites = Backbone.Collection.extend({});
        
        // Start Backbone routing in a way that won't break when we try
        // to start it with every test, and will get us into a known
        // place to start our tests from
        try {
            Backbone.history.start({silent:true});
        } catch(e) {}

        this.router.navigate("elsewhere");
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