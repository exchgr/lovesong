var LastFmNode	= require('lastfm').LastFmNode
	, _			= require('underscore')
	
var models = require('../models')

var lastfm = new LastFmNode({
  api_key: process.env.LASTFM_APP_KEY,    // sign-up for a key at http://www.last.fm/api
  secret: process.env.LASTFM_APP_SECRET
});

module.exports = {
	getSimilar: function(artist) {
		if (artist.similar == undefined) {
			artist.similar = [];
		}
		
		lastfm.request("artist.getSimilar", {
		    artist: artist.name,
			autocorrect: 1,
		    handlers: {
		        success: function(data) {

		        	var similarArtists = data.similarartists.artist;
		        	if(typeof similarArtists == 'string') {
		        		return;
		        	}

					_.each(similarArtists, function(similar) {
						props = {
							"name": similar.name,
							"mbid": similar.mbid,
							"lastfm": similar.url,
							"similar": [{
								'match': similar.match,
								'artist': artist._id
							}]
						};
						
						image = {};
						_.each(similar.image, function(img) {
							if(img['#text'] != '') {
								image[img.size] = img['#text'];
							}
						});
						
						if (_.size(image) > 0) {
							props._image = image;
						}
						
						
						models.Artist.modcreate(similar.name, props, function(err, simArt) {
						    if (simArt != undefined) {
						        // this is NOT PERFORMANT
    							artist.similar.push({
    								'match': similar.match,
    								'artist': simArt._id
    							});
    							artist.save(function() {

    							});
						    }
						});
					});
		        },
		        error: function(error) {
		            console.log("Error: " + error.message);
		        }
		    }
		});
	}
}