var models = require('../models')
	, pkg = require('../package.json')
	, music = require('../lib/music')
	
var _ = require('underscore')
    , async = require('async')

routes = {
	date: function(req, res, next) {
	    
	    models.User.findOne({'fbid': req.params.from}, function(err, from) {
	        models.User.findOne({'fbid': req.params.to}, function(err, to) {
	            to.getSimilarArtists({}, function(err, artists) {
                    
                    var sources = _.map(from.artists, function(artist){ return artist.toString() });
                    var shared = {};
                    
                    _.each(artists, function(artist) {
                        if(sources.indexOf(artist._id.toString()) != -1) {
                            shared[artist._id] = artist;
                        }
                    });
                              
                    // this logic isn't totally right     
                              
                    res.render("date", {
                		from: from,
                		to: to,
                		bands: shared
                	});
                	
	            });
	        });
	    });
	}
}

module.exports = routes;