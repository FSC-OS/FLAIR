describe("Site Model", function () {
    
    beforeEach(function () {
        this.completeSite = new FLAIR.Site(
            {
                id:0,
                location: {
                    name:"Site 1"        
                },
                experiments: new FLAIR.ExperimentCollection(
                    [{
                        id:0,
                        userId: "Group1",
                        groupId: "Group1",
                        datetime: "2012-01-01",
                        experimentType: "Wet Width",
                        help: "The Wet Width is the width of the water at the water line",
                        notes: "",
                        data: {
                            measurement:null,
                            unitOfMeasurement:"m"
                        },
                        schema: {
                            measurement: {
                                title: "Wet Width (m)",
                                type: "Number",
                                validators: ["required"],
                            }
                        },
                        site:0
                    },
                    {
                        id:1,
                        userId: "Group1",
                        groupId: "Group1",
                        datetime: "2012-01-01",
                        experimentType: "Wetted Perimeter",
                        notes: "",
                        help: "The wetted perimeter is the distance across the bed of the river plus the width across the surface",
                        data: {
                            measurement:null,
                            unitOfMeasurement:"m"     
                        },
                        schema: {
                            measurement: {
                                title: "Wetted Perimeter (m)",
                                type: "Number",
                                validators: ["required"]
                            }
                        },
                        site:0
                    },
                    {
                        id:2,
                        userId: "Group1",
                        groupId: "Group1",
                        datetime: "2012-01-01",
                        experimentType: "Gradient",
                        notes: "",
                        help: "Use your clinometer to measure the gradient of the surface of the water",
                        data: {
                            measurement:0,
                            unitOfMeasurement:"degree"        
                        },
                        schema: {
                            measurement: {
                                title: "Gradient (degree)",
                                type: "Number",
                                validators: ["required"]
                            }
                        },
                        site:0
                    },
                    {
                        id:3,
                        userId: "Group1",
                        groupId: "Group1",
                        datetime: "2012-01-01",
                        experimentType: "Wet (Water) Depth",
                        notes: "",
                        help: "Next we need to measure the depth of the water at 5 points across it. Make sure you evenly space you measurements.",
                        data: {
                            measurement1:0,
                            measurement2:0,
                            measurement3:0,
                            measurement4:0,
                            measurement5:0,
                            unitOfMeasurement:"m" 
                        },
                        schema: {
                            measurement1: {
                                title: "Wet (Water) Depth 1",
                                type: "Number",
                                validators: ["required"]
                            },
                            measurement2: {
                                title: "Wet (Water) Depth 2",
                                type: "Number",
                                validators: ["required"]
                            },
                            measurement3: {
                                title: "Wet (Water) Depth 3",
                                type: "Number",
                                validators: ["required"]
                            },
                            measurement4: {
                                title: "Wet (Water) Depth 4",
                                type: "Number",
                                validators: ["required"]
                            },
                            measurement5: {
                                title: "Wet (Water) Depth 5",
                                type: "Number",
                                validators: ["required"]
                            }
                        },
                        site:0
                    },
                    {
                        id:4,
                        userId: "Group1",
                        groupId: "Group1",
                        datetime: "2012-01-01",
                        experimentType: "Impellor Time",
                        notes: "",
                        help: "Measure how long it takes the impellor to go from one end to the other at 5 different points across the river. Again, make sure you measure at even points.",
                        data: {
                            measurement1:0,
                            measurement2:0,
                            measurement3:0,
                            measurement4:0,
                            measurement5:0,
                            unitOfMeasurement:"seconds"   
                        },
                        schema: {
                            measurement1: {
                                title: "Impellor Time 1",
                                type: "Number",
                                validators: ["required"]
                            },
                            measurement2: {
                                title: "Impellor Time 2",
                                type: "Number",
                                validators: ["required"]
                            },
                            measurement3: {
                                title: "Impellor Time 3",
                                type: "Number",
                                validators: ["required"]
                            },
                            measurement4: {
                                title: "Impellor Time 4",
                                type: "Number",
                                validators: ["required"]
                            },
                            measurement5: {
                                title: "Impellor Time 5",
                                type: "Number",
                                validators: ["required"]
                            }
                        },
                        site:0
                    }]
                )
            }
        );

    });

    afterEach(function() {
        this.completeSite.destroy();
    });

    it("Should have an id of 1", function () {
        expect(this.completeSite.get("id")).toEqual(0);
    });

    it("Should have a location with the name \"Site 1\"", function () {
        expect(this.completeSite.get("location").name).toEqual("Site 1");
    });

    it("Should have 5 experiments", function () {
        expect(typeof this.completeSite.get("experiments")).toBe("object");
        expect(this.completeSite.get("experiments").length).toEqual(5);
    });

    it("Should have a relations property", function () {
        expect(typeof this.completeSite.getRelations()).toBe("object");
    });

});