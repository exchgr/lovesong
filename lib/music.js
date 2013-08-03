var LastFmNode = require('lastfm').LastFmNode;

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
		            console.log("Success: " + data);
		        },
		        error: function(error) {
		            console.log("Error: " + error.message);
		        }
		    }
		});
	}
}