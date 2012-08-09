describe("Site Model", function () {
    
    beforeEach(function () {
        this.completeSite = new Site(
            {
                id:1,
                location: {
                    name:"Site1"        
                },
                experiments: new ExperimentCollection(
                    [{
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
                    },
                    {
                        id:2,
                        userId: "Group1",
                        groupId: "Group1",
                        datetime: "2012-01-01",
                        experimentType: "Wetted Perimeter",
                        notes: "",
                        data: {
                            measurement:2.8,
                            unitOfMeasurement:"m"     
                        }
                    },
                    {
                        id:3,
                        userId: "Group1",
                        groupId: "Group1",
                        datetime: "2012-01-01",
                        experimentType: "Gradient",
                        notes: "",
                        data: {
                            measurement:4,
                            unitOfMeasurement:"degree"        
                        }
                    },
                    {
                        id:4,
                        userId: "Group1",
                        groupId: "Group1",
                        datetime: "2012-01-01",
                        experimentType: "Impellor Time",
                        notes: "",
                        data: {
                            measurement:[75,28,20,19.5,78],
                            unitOfMeasurement:"seconds"   
                        }
                    },
                    {
                        id:5,
                        userId: "Group1",
                        groupId: "Group1",
                        datetime: "2012-01-01",
                        experimentType: "Wet (Water) Depth",
                        notes: "",
                        data: {
                            measurement:[0.2,0.25,0.11,0.1,0.1,0.09,0.06,0.12,0.02,0.03],
                            unitOfMeasurement:"m" 
                        }
                    }]
                )
            }
        );

        this.incompleteSite = new Site(
            {
                id:2,
                location: {
                    name:"Site1"        
                },
                experiments: new ExperimentCollection(
                    [{
                        id:6,
                        userId: "Group1",
                        groupId: "Group1",
                        datetime: "2012-01-01",
                        experimentType: "Wet Width",
                        notes: "",
                        data: {
                            measurement:null,
                            unitOfMeasurement:"m"     
                        }
                    }]
                )
            }
        );
    });

    it("Should have an id of 1", function () {
        expect(this.completeSite.get("id")).toEqual(1);
    });

    it("Should have a location with the name \"Site1\"", function () {
        expect(this.completeSite.get("location").name).toEqual("Site1");
    });

    it("Should have 5 experiments", function () {
        expect(typeof this.completeSite.get("experiments")).toBe("object");
        expect(this.completeSite.get("experiments").length).toEqual(5);
    });

    it("Should have a relations property", function () {
        expect(typeof this.completeSite.getRelations()).toBe("object");
    });

    it("Should correctly determine if it's complete", function () {
        expect(this.completeSite.isComplete()).toBe(true);
        expect(this.incompleteSite.isComplete()).toBe(false);
    });

});