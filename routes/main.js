var models = require('../models')
	, pkg = require('../package.json')
	, music = require('../lib/music')

var _ = require('underscore')
home = function(req, res) {
	res.render("home", {
		project: pkg.name,
		user: req.user
	});
}

module.exports = {
	landing: home,
	home: home,
	index: home
};