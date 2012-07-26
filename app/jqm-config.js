// Configure jquery mobile
$(document).on('mobileinit', function(){
    // Setup some jquery mobile defaults
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    $.mobile.defaultPageTransition = "none";

    // Remove page from DOM when it's being replaced, and unbind any events
    $(document).on('pagehide', 'div[data-role="page"]', function (event, ui) {
        $(event.currentTarget).remove();
        $(event.currentTarget).unbind();
    });
});