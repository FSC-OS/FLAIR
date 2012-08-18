describe("Experiment View", function() {

	var mockExperiment;

	beforeEach(function() {

		mockExperiment = new Backbone.Model({
			id:1,
			order:0,
            site:0,
            userId: "Group1",
            groupId: "Group1",
            datetime: "2012-01-01",
            experimentType: "Wet Width",
            help: "The Wet Width is the width of the water at the water line",
            notes: "",
            data: {
                measurement:1.9,
                unitOfMeasurement:"m"
            },
            schema: {
                measurement: {
                    title: "Wet Width (m)",
                    type: "Number",
                    validators: ["required"],
                }
            }
        });

        this.view = new ExperimentView({model: mockExperiment, pageId: "page-id", next: "next", previous: "previous"});

        this.view.render();
	});

	it("Should set the title from the model", function(){
		expect($(this.view.el).find("h1")).toHaveText("Wet Width");
	});

	it("Should create a form from the model", function() {
		expect($(this.view.el).find(".form")).not.toBeEmpty();
	});

	it("Should set the previous link in the header", function() {
		expect($(this.view.el).find("div[data-role='header'] > a")).toHaveAttr("href", "previous");
	});

	it("Should set the next link as a submit button", function() {
		expect($(this.view.el).find("div[data-role='content']").find("a.next")).toHaveAttr("href", "next");
	});

	it("Should save the model when you click the submit button", function(){
		// Spy on the experiment model's save function
		var experimentFormStub = sinon.stub(this.view.form, "validate");
		experimentFormStub.returns(null);
        var experimentModelStub = sinon.stub(mockExperiment, "save");
        experimentModelStub.returns(true);

        $(this.view.el).find("div[data-role='content']").find("a.next").trigger("vclick");
        
        sinon.assert.called(experimentModelStub);
        
        mockExperiment.save.restore();
        this.view.form.validate.restore();
	});

	it("Should validate the model when you click the submit button", function() {
		var alertStub = sinon.stub(window, "alert");
        var experimentFormStub = sinon.stub(this.view.form, "validate");
        experimentFormStub.returns(null);
        var experimentModelStub = sinon.stub(mockExperiment, "save");
        experimentModelStub.returns(true);
        
        $(this.view.el).find("div[data-role='content']").find("a.next").trigger("vclick");
        
        sinon.assert.called(experimentFormStub);

        mockExperiment.save.restore();
        this.view.form.validate.restore();
        window.alert.restore();
	});

	it("Should alert you when the model is invalid and not save", function(){
        var alertStub = sinon.stub(window, "alert");
        var experimentFormStub = sinon.stub(this.view.form, "validate");
        // validate() returns an errors object or null
        experimentFormStub.returns({});
        var experimentModelStub = sinon.stub(mockExperiment, "save");

        $(this.view.el).find("div[data-role='content']").find("a.next").trigger("vclick");

        sinon.assert.called(alertStub);
        sinon.assert.notCalled(experimentModelStub);
        
        window.alert.restore();
        mockExperiment.save.restore();
	});
});