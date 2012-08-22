// Bootstrapped Collection of sites, eventually this will be loaded
// from somewhere else, but this allows us to click a button and get
// sites just like that.
;(function(FLAIR, Backbone, _, $) {
    _.extend(FLAIR, {
        bootstrap: function(collection) {
            // Populate it with some data - this is just "in-memory" until
            // we save it to the persistence
            collection.reset(
                [{
                    id:0,
                    location: {
                        name:"Site 1"        
                    },
                    visualisation: "riverCrossSection",
                    experiments: new FLAIR.ExperimentCollection(
                        [{
                            id:0,
                            order:0,
                            userId: "Group1",
                            groupId: "Group1",
                            datetime: "2012-01-01",
                            experimentType: "Wet Width",
                            help: "The Wet Width is the width of the water at the water line",
                            notes: "",
                            data: {
                                measurement:"null",
                                unitOfMeasurement:"m"
                            },
                            schema: {
                                measurement: {
                                    title: "Wet Width (m)",
                                    type: "Number",
                                    validators: ["required"],
                                }
                            },
                            visualisation: true,
                            site:0
                        },
                        {
                            id:1,
                            order:1,
                            userId: "Group1",
                            groupId: "Group1",
                            datetime: "2012-01-01",
                            experimentType: "Wetted Perimeter",
                            notes: "",
                            help: "The wetted perimeter is the distance across the bed of the river plus the width across the surface",
                            data: {
                                measurement:"null",
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
                            order:2,
                            userId: "Group1",
                            groupId: "Group1",
                            datetime: "2012-01-01",
                            experimentType: "Gradient",
                            notes: "",
                            help: "Use your clinometer to measure the gradient of the surface of the water",
                            data: {
                                measurement:"null",
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
                            order:3,
                            userId: "Group1",
                            groupId: "Group1",
                            datetime: "2012-01-01",
                            experimentType: "Wet Water Depth",
                            notes: "",
                            help: "Next we need to measure the depth of the water at 5 points across it. Make sure you evenly space you measurements.",
                            data: {
                                measurement:[0,0,0,0,0],
                                unitOfMeasurement:"m" 
                            },
                            schema: {
                                measurement: {
                                    title: "Wet Water Depth",
                                    type: "List",
                                    validators: ["required"],
                                    listType: "Number"
                                },
                            },
                            visualisation: true,
                            site:0
                        },
                        {
                            id:4,
                            order:4,
                            userId: "Group1",
                            groupId: "Group1",
                            datetime: "2012-01-01",
                            experimentType: "Impellor Time",
                            notes: "",
                            help: "Measure how long it takes the impellor to go from one end to the other at 5 different points across the river. Again, make sure you measure at even points.",
                            data: {
                                measurement:[0,0,0,0,0],
                                unitOfMeasurement:"s" 
                            },
                            schema: {
                                measurement: {
                                    title: "Impellor time (secs)",
                                    type: "List",
                                    validators: ["required"],
                                    listType: "Number"
                                },
                            },
                            site:0
                        }]
                    )
                },
                {
                    id:1,
                    location: {
                        name:"Site 2"        
                    },
                    visualisations: "riverCrossSection",
                    experiments: new FLAIR.ExperimentCollection(
                        [{
                            id:5,
                            order:0,
                            userId: "Group1",
                            groupId: "Group1",
                            datetime: "2012-01-01",
                            experimentType: "Wet Width",
                            help: "The Wet Width is the width of the water at the water line",
                            notes: "",
                            data: {
                                measurement:"null",
                                unitOfMeasurement:"m"
                            },
                            schema: {
                                measurement: {
                                    title: "Wet Width (m)",
                                    type: "Number",
                                    validators: ["required"],
                                }
                            },
                            visualisation: true,
                            site:1
                        },
                        {
                            id:6,
                            order:1,
                            userId: "Group1",
                            groupId: "Group1",
                            datetime: "2012-01-01",
                            experimentType: "Wetted Perimeter",
                            notes: "",
                            help: "The wetted perimeter is the distance across the bed of the river plus the width across the surface",
                            data: {
                                measurement:"null",
                                unitOfMeasurement:"m"     
                            },
                            schema: {
                                measurement: {
                                    title: "Wetted Perimeter (m)",
                                    type: "Number",
                                    validators: ["required"]
                                }
                            },
                            site:1
                        },
                        {
                            id:7,
                            order:2,
                            userId: "Group1",
                            groupId: "Group1",
                            datetime: "2012-01-01",
                            experimentType: "Gradient",
                            notes: "",
                            help: "Use your clinometer to measure the gradient of the surface of the water",
                            data: {
                                measurement:"null",
                                unitOfMeasurement:"degree"        
                            },
                            schema: {
                                measurement: {
                                    title: "Gradient (degree)",
                                    type: "Number",
                                    validators: ["required"]
                                }
                            },
                            site:1
                        },
                        {
                            id:8,
                            order:3,
                            userId: "Group1",
                            groupId: "Group1",
                            datetime: "2012-01-01",
                            experimentType: "Wet Water Depth",
                            notes: "",
                            help: "Next we need to measure the depth of the water at 5 points across it. Make sure you evenly space you measurements.",
                            data: {
                                measurement:[0,0,0,0,0],
                                unitOfMeasurement:"m" 
                            },
                            schema: {
                                measurement: {
                                    title: "Wet Water Depth",
                                    type: "List",
                                    validators: ["required"],
                                    listType: "Number"
                                },
                            },
                            visualisation: true,
                            site:1
                        },
                        {
                            id:9,
                            order:4,
                            userId: "Group1",
                            groupId: "Group1",
                            datetime: "2012-01-01",
                            experimentType: "Impellor Time",
                            notes: "",
                            help: "Measure how long it takes the impellor to go from one end to the other at 5 different points across the river. Again, make sure you measure at even points.",
                            data: {
                                measurement:[0,0,0,0,0],
                                unitOfMeasurement:"s" 
                            },
                            schema: {
                                measurement: {
                                    title: "Impellor time (secs)",
                                    type: "List",
                                    validators: ["required"],
                                    listType: "Number"
                                },
                            },
                            site:1
                        }]
                    )
                }]
            );

            // Save each site into the persistence.
            collection.each(function(site) {
                site.save();
            });
        }
    });
})(FLAIR, Backbone, _, $);