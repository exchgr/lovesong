define([
	'jquery'
], function ($) {
	if ($('.navbar.loggedin').length > 0) {
		console.log('d');
		
		// load the full app
		require(["app/views/dash"],
			function(Dashboard) {
				console.log('d2');
				console.log(Dashboard);
			}
		);
	} else {
		// keep the landing page lightweight; ie. don't load Backbone, etc.
		$('.vert-center').css('margin-top', -$('.vert-center').outerHeight()/2 + 'px');
	}
});