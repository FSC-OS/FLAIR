// Experiments Collection
// ----------------------

// Collection of Experiment objects which need to be undertaken.
// Each site has a collection of these.
window.ExperimentCollection = Backbone.Collection.extend({

    // Note: no url or other persistence supplied, the objects contained
    // within this collection will be persisted with the Site object 
    // and the Exercise collection it resides in, this is merely a 
    // container to allow Backbone-relational to do its' magic.
    model: Experiment
    
});