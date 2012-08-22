// Exercise Collection
// -------------------

// The global collection of Site objects which define where 
// we're supposed to undertake experiments
;(function(FLAIR, Backbone, _, $) {
	_.extend(FLAIR, {
		Exercise: Backbone.Collection.extend({
		    model: FLAIR.Site    
		})
	});
})(FLAIR, Backbone, _, $);

