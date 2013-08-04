var models = require('../models')
	, pkg = require('../package.json')
	, music = require('../lib/music')
	
var _ = require('underscore')
    , async = require('async')

routes = {
	recommendations: function( req, res, next ) {	    
		req.user.getMatches({
		    limit: 5,
		    search: {
		        gender: 'female'
		    }
		}, function(err, matches) {
		    		    
		    var recommendations = [];
		    
		    var maxMatch = req.user.artists.length;
		    
		    async.each(matches, function(match, cb) {
		        var match = match.toJSON({'virtuals': true});
		        
		        match.score = match._recommendations[req.user._id].score;
		        match.percent = match.score / maxMatch * 100;
		        match.shared = [];
		        		        		        
		        var shared = match._recommendations[req.user._id].shared;
		        
                async.each(_.keys(shared), function(id, done) {
                    models.Artist.getty(id, function(err, artist) {
                        var artist = artist.toJSON({'virtuals': true});
                        artist.match = shared[artist._id];
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