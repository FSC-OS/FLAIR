// Exercise Collection
// -------------------

// The global collection of Site objects which define where 
// we're supposed to undertake experiments
;(function() {
	_.extend(window.FLAIR, {
		Exercise: Backbone.Collection.extend({
		    model: FLAIR.Site    
		})
	});
})();

