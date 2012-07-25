// Configure jquery mobile
$(document).on('mobileinit', function(){
  // Setup some jquery mobile defaults
  $.mobile.ajaxEnabled = false;
  $.mobile.linkBindingEnabled = false;
  $.mobile.hashListeningEnabled = false;
  $.mobile.pushStateEnabled = false;
  $.mobile.defaultPageTransition = "none";

  // Remove page from DOM when it's being replaced
  $('div[data-role="page"]').on('pagehide', function (event, ui) {
      $(event.currentTarget).remove();
  });
});