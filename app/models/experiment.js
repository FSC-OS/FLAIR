// Experiment Model
// ----------------

// Model for containing the data of an experiment.
window.Experiment = Backbone.Model.extend({

    defaults: function() {
        return {
            userId: "",
            groupId: "",
            datetime: Date.now,
            experimentType: "",
            location: {},
            notes: "",
            data: {}
        }
    },

    // Function to say whether this experiment is complete
    isComplete: function() {
        // Optimistic for the moment
        return true;
    },

    // Function to clear this experiment
    clear: function() {
      this.destroy();
    }

});

// Sample list of experiments for rivers:

// [{
//     userId: "Group1",
//     groupId: "Group1",
//     datetime: "2012-01-01",
//     experimentType: "Wet Width",
//     location: {
//         name:"Site1"        
//     },
//     notes: "",
//     data: {
//         measurement:1.9,
//         unitOfMeasurement:"m"     
//     }
// },
// {
//     userId: "Group1",
//     groupId: "Group1",
//     datetime: "2012-01-01",
//     experimentType: "Wetted Perimeter",
//     location: {
//         name:"Site1"        
//     },
//     notes: "",
//     data: {
//         measurement:2.38,
//         unitOfMeasurement:"m"     
//     }
// },
// {
//     userId: "Group1",
//     groupId: "Group1",
//     datetime: "2012-01-01",
//     experimentType: "Gradient",
//     location: {
//         name:"Site1"        
//     },
//     notes: "",
//     data: {
//         measurement:4,
//         unitOfMeasurement:"degree"        
//     }
// },
// {
//     userId: "Group1",
//     groupId: "Group1",
//     datetime: "2012-01-01",
//     experimentType: "Impellor Time",
//     location: {
//         name:"Site1"        
//     },
//     notes: "",
//     data: {
//         measurement:[75,28,20,19.5,78],
//         unitOfMeasurement:"seconds"   
//     }
// },
// {
//     userId: "Group1",
//     groupId: "Group1",
//     datetime: "2012-01-01",
//     experimentType: "Wet (Water) Depth",
//     location: {
//         name:"Site1"        
//     },
//     notes: "",
//     data: {
//         measurement:[0.2,0.25,0.11,0.1,0.1,0.09,0.06,0.12,0.02,0.03],
//         unitOfMeasurement:"m" 
//     }
// }]