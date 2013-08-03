// we need mongoose
var mongoose	= require('mongoose')
	, _ 		= require('../public/lib/underscore')
	
var music		= require('../lib/music')	

var schema = mongoose.Schema({
	"name": String,
	"mbid": String,
	"fbid": Number,
	"lastfm": String,
	"match": Number, // never store this
	"_image": {type: mongoose.Schema.Types.Mixed},
	"similar": [{
		'match': Number,
		'artist': { type: mongoose.Schema.Types.ObjectId, ref: 'artists' }
	}]
});

schema.methods.fillSimilar = function(cb) {
	music.getSimilar(this, function(data) {
		this.getSimilar(cb);
	});
}

schema.methods.getSimilar = function(cb) {
	var similar = [];
	_.each(this.similar, function(sa) {
		similar[sa.artist] = sa.match;
	});
	
	Artist.find({'_id': {'$in': _.keys(similar)}}, function(err, artists) {
		cb(err, artists);
	});
}

schema.statics.modcreate = function( name, properties, cb ) {	
	Artist.findOneAndUpdate({'name': name}, properties, {upsert:true}, function(err, artist) {
		if(cb != undefined ) {
			cb(err, artist);
		}
	});
}

var Artist = module.exports = mongoose.model('artists', schema);