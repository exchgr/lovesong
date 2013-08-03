// Boilerplate User Schema
var mongoose = require('mongoose');

var _ = require('underscore');

schema =  new mongoose.Schema({
	username: String,
	joined:   {type: Date, default: Date.now},
	externals: {type: mongoose.Schema.Types.Mixed, default: {}}
});

// schema.virtual('url').get(function () {
//   return 'http://caus.io/' + this.username;
// });

schema.virtual('name').get(function () {
	if( this.externals.facebook != undefined ) {
		return this.externals.facebook.displayName;
	}
	else
	{
		return this.username;
	}
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