var Sample = require('../models/sample')
	, pkg = require('../package.json')

exports.index = function( req, res ) {
	
	Sample.create({ "first": "Bob", "last": "Sam"}, function( err, smpl ) {
		console.log( smpl.getName() );
	});
	
	res.render("index", {
		project: pkg.name
	});
}