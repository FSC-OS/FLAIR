// Exercise Collection
// --------------

// The global collection of Site objects which define where 
// we're supposed to undertake experiments
window.Exercise = Backbone.Collection.extend({

    localStorage: new Backbone.LocalStorage("flair-exercise"),

    model: Site
    
});

// Bootstrapped Collection of sites, eventually this will be loaded
// from somewhere else
window.Sites = new Exercise(
    [{
        location: {
            name:"Site1"        
        },
    },
    {
        location: {
            name:"Site2"        
        },
    },
    {
        location: {
            name:"Site3"        
        },
    }]
);