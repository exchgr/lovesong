var LastFmNode	= require('lastfm').LastFmNode
	, _			= require('underscore')
	
var models = require('../models')

var lastfm = new LastFmNode({
  api_key: process.env.LASTFM_APP_KEY,    // sign-up for a key at http://www.last.fm/api
  secret: process.env.LASTFM_APP_SECRET
});

module.exports = {
	getSimilar: function(artist) {
		lastfm.request("artist.getSimilar", {
		    artist: artist.name,
			autocorrect: 1,
		    handlers: {
		        success: function(data) {
					_.each(data.similarartists.artist, function(similar) {
						
						// 15:41:59 web.1     | { name: 'Buffalo Springfield',
						// 15:41:59 web.1     |   mbid: '22dc19af-d085-4c9b-adfb-22ec256251f1',
						// 15:41:59 web.1     |   match: '0.0388541',
						// 15:41:59 web.1     |   url: 'www.last.fm/music/Buffalo+Springfield',
						// 15:41:59 web.1     |   image: 
						// 15:41:59 web.1     |    [ { '#text': 'http://userserve-ak.last.fm/serve/34/39569377.png',
						// 15:41:59 web.1     |        size: 'small' },
						// 15:41:59 web.1     |      { '#text': 'http://userserve-ak.last.fm/serve/64/39569377.png',
						// 15:41:59 web.1     |        size: 'medium' },
						// 15:41:59 web.1     |      { '#text': 'http://userserve-ak.last.fm/serve/126/39569377.png',
						// 15:41:59 web.1     |        size: 'large' },
						// 15:41:59 web.1     |      { '#text': 'http://userserve-ak.last.fm/serve/252/39569377.png',
						// 15:41:59 web.1     |        size: 'extralarge' },
						// 15:41:59 web.1     |      { '#text': 'http://userserve-ak.last.fm/serve/500/39569377/Buffalo+Springfield+BuffaloSpringfield.png',
						// 15:41:59 web.1     |        size: 'mega' } ],
						// 15:41:59 web.1     |   streamable: '1' }
						
						props = {
							"name": similar.name,
							"mbid": similar.mbid,
							"lastfm": similar.url,
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
										
						models.Artist.modcreate(similar.name, props);
					});
		        },
		        error: function(error) {
		            console.log("Error: " + error.message);
		        }
		    }
		});
	}
}