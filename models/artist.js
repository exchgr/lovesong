// we need mongoose
var mongoose	= require('mongoose')
	, _ 		= require('../public/lib/underscore')		

var artistSchema = mongoose.Schema({
	"name": String,
	"mbid": String,
	"lastfm": String,
	"_image": {type: mongoose.Schema.Types.Mixed},
	"similar": [new mongoose.Schema({
		'match': Number,
		'artist': { type: mongoose.Schema.Types.ObjectId, ref: 'artists' }
	})]
});

artistSchema.statics.modcreate = function( name, properties, cb ) {
	console.log(properties);
	Artist.findOneAndUpdate({'name': name}, properties, {upsert:true}, function(err, artist) {
		if(cb != undefined ) {
			cb(err,artist);
		}
	});
}

var Artist = module.exports = mongoose.model('artists', artistSchema);