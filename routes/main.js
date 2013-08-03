var models = require('../models')
	, pkg = require('../package.json')
	, music = require('../lib/music')

routes = {
	index: function( req, res ) {
		if (req.user != undefined) {
			routes.home(req,res);
		} else {
			routes.landing(req,res);
		}
	},
	home: function(req, res) {
		console.log(req.user.artists);
		
		res.render("home", {
			project: pkg.name,
			user: req.user
		});
	},
	landing: function(req, res) {
		res.render("landing", {
			project: pkg.name
		});
	}
}

module.exports = routes;