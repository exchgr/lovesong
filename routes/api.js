var models = require('../models')
	, pkg = require('../package.json')
	, music = require('../lib/music')

var _ = require('underscore')

routes = {
	recommendations: function( req, res, next ) {
		req.user.getMatches({}, function(err, matches) {
			res.send(matches);
		});
	},
	artists: function( req, res, next ) {
		req.user.getSimilarArtists({}, function(err, artists) {
			res.send(artists);
		});
	}
}

module.exports = routes;