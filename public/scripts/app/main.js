define(['jquery', 'facebook'], function($, FB) {
    FB.init({
        appId: '513897315346898'
        // channelUrl : '//yourdomain.com/channel.html'
    });

    function loggedin(user) {

        $('.navbar').show();

        $('.navbar .profile').html('<img class="avatar" src="' + user.image + '" /> ' + user.displayName);

        // load the full app
        require(["app/views/dash"], function(Dashboard) {
            new Dashboard;
        });
    }

    FB.getLoginStatus(function(response) {
        if (response.status == "connected") {
            $.post('/auth/confirm', {
                data: {
                    id: response.authResponse.userID,
                    accessToken: response.authResponse.accessToken
                }
            }, function(data, status) {
                loggedin(data);
            });
        } else {
            // keep the landing page lightweight; ie. don't load Backbone, etc.
            $('.vert-center').css('margin-top', -$('.vert-center').outerHeight() / 2 + 'px');
                        
            $('#login').click(function(e) {
                e.preventDefault();
                
                FB.login(function(response) {
                    if (response.authResponse) {
                        
                        $('#landing').slideUp();
                        $('#loading').slideDown();
                        
                        $.post('/auth/confirm', {
                            data: {
                                id: response.authResponse.userID,
                                accessToken: response.authResponse.accessToken
                            }
                        }, function(data, status) {
                            loggedin(data);
                        });
                    }
                });
            });
        }
    });
});
