/**
 * function to start the app
 */
var startApp = function() {
    app = new AppRouter();
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