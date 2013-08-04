define([
	'jquery'
], function ($) {
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
	}
});