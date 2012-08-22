/**
 * function to start the app
 */
;(function(FLAIR, Backbone, _, $) {
	var startApp = function() {
		_.extend(FLAIR, {
			Sites: new FLAIR.Exercise(),
		    app: new FLAIR.AppRouter()
		});
		FLAIR.Sites.fetch();
	    Backbone.history.start();
	};

	/**
	 * Start everything on document ready or deviceready depending on what system
	 * type of device we"re on.
	 */
	if(window.Phonegap) {
	    $(document).on("deviceready", startApp);
	}
	else {
	    $(document).ready(startApp);
	}
})(FLAIR, Backbone, _, $);