var passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy
	, models = require('../models')

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	models.User.findById( id, function( err, user ) {
		done( err, user );
	});
});

// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: '/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {

	models.User.findOne({'externals.facebook.id': profile.id}, function( err, user ) {
		if( user ) {
			return done(null, user)
		}
		else {
			models.User.create({
				username: profile.username,
				origin: 'fb',
				externals: { facebook: profile } },
				function( err, user ) {
					done( err, user );
				}
			);
		}
	})
  }
));

// authentication routes & functions
module.exports = {
	'login': function( req, res, next ) {

		if( req.user.origin == 'auto' ) {
			req.session.auto_user = req.user._id;
			res.redirect('/auth/facebook');
		}
		else
		{
			res.redirect('/');
		}
	},
	'facebook': {
		'start': [
			passport.authenticate('facebook')
		],
		'end': [
			passport.authenticate('facebook', { failureRedirect: '/login' }),
			function( req, res, next ) {
				console.log(req.user);
				res.redirect('/');
			}
		]
	}
}