var models = require('../models')
	, pkg = require('../package.json')
	, music = require('../lib/music')
	
var _ = require('underscore')
    , async = require('async')

routes = {
	recommendations: function( req, res, next ) {
		req.user.getMatches({limit: 5000}, function(err, matches) {
		    
		    console.log(req.user._artists);
		    
		    var recommendations = [];
		    
		    async.each(matches, function(match, cb) {
		        var match = match.toJSON();
		        
		        match.score = match._recommendations[req.user._id].score;
		        match.shared = [];
		        		        		        
		        var shared = match._recommendations[req.user._id].shared;
		        
                async.each(_.keys(shared), function(id, done) {
                    models.Artist.getty(id, function(err, artist) {
                        var artist = artist.toJSON();
                        artist.match = shared[artist._id];
                        artist.image = artist._image;
                        match.shared.push(artist);
                        done();
                    });
                }, function(err) {    
                    // clean up a little
                    delete match._friends;
                    delete match._artists;
                    delete match._recommendations;
    		        
                                    
                    recommendations.push(match);
                    cb();
                });
		        
		    }, function(err) {		        
                res.send(recommendations);
		    });			
		});
	},
	artists: function( req, res, next ) {
		req.user.getSimilarArtists({}, function(err, artists) {
			res.send(artists);
		});
	}
}

module.exports = routes;