// Exercise Collection
// -------------------

// The global collection of Site objects which define where 
// we're supposed to undertake experiments
window.Exercise = Backbone.Collection.extend({

    localStorage: new Backbone.LocalStorage("flair-exercise"),
    model: Site
    
});

