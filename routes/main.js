var models = require('../models')
	, pkg = require('../package.json')

exports.index = function( req, res ) {
	
	if (req.user != undefined) {
		res.render("home", {
			project: pkg.name,
			user: req.user
		});
	} else {
		res.render("landing", {
			project: pkg.name
		});
	}
	
	
}