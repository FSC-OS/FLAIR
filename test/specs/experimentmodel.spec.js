describe("Experiment Model", function () {
    
    beforeEach(function () {
        this.completeExperiment = new Experiment(
            {
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
            }
        );
        this.incompleteExperiment = new Experiment(
            {
                id:1,
                userId: "Group1",
                groupId: "Group1",
                datetime: "2012-01-01",
                experimentType: "Wet Width",
                notes: "",
                data: {
                    measurement:null,
                    unitOfMeasurement:"m"     
                }
            }
        );
    });

    it("Should correctly determine if it's complete", function () {
        expect(this.completeExperiment.isComplete()).toBe(true);
        expect(this.incompleteExperiment.isComplete()).toBe(false);
    });

});