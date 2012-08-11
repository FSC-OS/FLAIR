describe("Experiment View", function() {

	var mockExperiment;

	beforeEach(function() {

		mockExperiment = new Backbone.Model({
			id:1,
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
                    type: 'Number',
                    validators: 'required',
                }
            },
            site: {
            	id:1,
	            location: {
	                name:"Site1"        
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
		this.fail("Not yet implemented");
	});

	it("Should validate the model when you click the submit button", function(){
		this.fail("Not yet implemented");
	});

	it("Should alert you when the model is invalid", function(){
		this.fail("Not yet implemented");
	});
});