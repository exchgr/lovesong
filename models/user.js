// Boilerplate User Schema
var mongoose	= require('mongoose'),
	_			= require('underscore')
	
var Artist		= require('./artist');

schema =  new mongoose.Schema({
	username: String,
	joined:   {type: Date, default: Date.now},
	externals: {type: mongoose.Schema.Types.Mixed, default: {}},
	_artists: {
		facebook: [{ type: mongoose.Schema.Types.ObjectId, ref: 'artists' }]
	}
});

schema.virtual('image').get(function () {
  return 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/c19.19.243.243/s160x160/73253_10151143232340814_480281695_n.jpg';
});

schema.virtual('name').get(function () {
	if( this.externals.facebook != undefined ) {
		return this.externals.facebook.displayName;
	}
	else
	{
		return this.username;
	}
});

schema.virtual('fbToken').get(function () {
	return this.externals.facebook.accessToken;
});

schema.virtual('artists').get(function () {
	artists = [];
		
	_.each(this._artists.facebook, function(artist) {
		artists.push(artist);
	})
	
	return artists;
});

schema.methods.getArtists = function(cb) {
	Artist.find({'_id': {'$in': this.artists}}, function(err, artists) {
		cb(err, artists);
	});
	// Artist.find({})
}

schema.methods.getSimilarArtists = function(options, cb) {
	var injectOwn = options.injectOwn || true;
	
	this.getArtists(function(err, myArtists) {
		var similarity = [];
		
		_.each(myArtists, function(artist) {
			_.each(artist.similar, function(sa) {
				if (similarity[sa.artist] == undefined) {
					similarity[sa.artist] = 0;
				}
				similarity[sa.artist] = similarity[sa.artist] + sa.match;
			});
		});
				
		Artist.find({'_id': {'$in': _.keys(similarity)}}, function(err, artists) {
			_.each(artists, function(artist) {
				artist.match = similarity[artist._id];
			});
			
			if (injectOwn) {
				_.each(myArtists, function(artist) {
					artist.match = 1; // we match 100% with our own artists
					artists.push(artist);
				})
			}
			
			cb(err, artists);
			
		});
	});
}

module.exports = mongoose.model('users', schema);