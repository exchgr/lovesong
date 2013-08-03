// we need mongoose
var mongoose = require('mongoose')
		, _ = require('../public/lib/underscore')
	
var sampleSchema = mongoose.Schema({
	"first": String,
	"last": String
});

sampleSchema.virtual('name').get(function () {
  return this.first + " " + this.last;
});

sampleSchema.methods.getName = function() {
	return this.name;
}

sampleSchema.statics.getSample = function( cb ) {
	Sample.findOne( {}, function( err, sample ) {
		cb( err, sample );
	});
}

var Sample = module.exports = mongoose.model('Sample', sampleSchema);