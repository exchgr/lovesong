var models = require('../models')
	, pkg = require('../package.json')
	, music = require('../lib/music')

var _ = require('underscore')

landing = function(req, res) {
	res.render("landing", {
		project: pkg.name
	});
}

home = function(req, res) {
	res.render("home", {
		project: pkg.name,
		user: req.user
	});
}

index = function(req, res) {
	if (req.user != undefined) {
		home(req,res);
	} else {
		landing(req,res);
	}
}
g
module.exports = {
	landing: landing,
	home: home,
	index: index
};