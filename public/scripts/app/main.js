define([
  'jquery',
  'facebook'
], function ($, FB) {
    FB.init({
        appId      : '513897315346898'
        // channelUrl : '//yourdomain.com/channel.html'
    });
    
    FB.getLoginStatus(function(response) {
        console.log(response);
    });
    
    
    if ($('.navbar.loggedin').length > 0) {
    // load the full app
    require(["app/views/dash"],
            function(Dashboard) {
              new Dashboard;
            }
           );
    } else {
        // keep the landing page lightweight; ie. don't load Backbone, etc.
        $('.vert-center').css('margin-top', -$('.vert-center').outerHeight()/2 + 'px');
        
        $('#login').click(function(e) {
            FB.login();
            e.preventDefault();
        });
    }
});
