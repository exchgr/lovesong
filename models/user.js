// Boilerplate User Schema
var mongoose = require('mongoose');

var _ = require('underscore');

schema =  new mongoose.Schema({
	username: String,
	joined:   {type: Date, default: Date.now},
	externals: {type: mongoose.Schema.Types.Mixed, default: {}},
	_artists: {
		facebook: {type: mongoose.Schema.Types.Mixed, default: []}
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
		artists.push({
			'name': artist.name,
			'fbID': artist.id
		})
	})
	
	return artists;
});

// schema.virtual('givenName').get(function () {
// 	if( this.externals.facebook != undefined ) {
// 		return this.externals.facebook.name.givenName;
// 	}
// 	else
// 	{
// 		return this.username;
// 	}
// });

module.exports = mongoose.model('users', schema);