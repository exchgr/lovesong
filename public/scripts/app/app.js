require.config({
	baseUrl: "static/scripts/lib",
	paths: {
		"app": "../app",
		"jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
	},
	shim: {
		'jquery': {
             exports: '$'
         },
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

// Load the main app module to start the app
require(["app/main"]);