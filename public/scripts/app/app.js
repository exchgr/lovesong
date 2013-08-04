require.config({
	baseUrl: "/scripts/lib",
	paths: {
		"app": "../app",
		"jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
		'facebook': '//connect.facebook.net/en_US/all' 
	},
	shim: {
		'jquery': {
             exports: '$'
         },
        'bootstrap': {
            deps: ['jquery']
        },
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'facebook': {
		    exports: 'FB'
		}
	}
});

// Load the main app module to start the app
require(["app/main"]);