var passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy
	, fbgraph = require('fbgraph')
	, models = require('../models')
	, _ = require('underscore')
	, async = require('async')

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

	models.User.findOne({'fbid': profile.id}, function( err, user ) {
		if( user ) {
		    if (user.externals.facebook == undefined) {
		        user.externals.facebook = {};
		    }
		    user.externals.facebook.accessToken = accessToken;
		    
			return done(null, user)
		}
		else {
			
			profile.accessToken = accessToken;
			
			models.User.create({
				username: profile.username,
				displayName: profile.displayName,
				fbid: profile.id,
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
	'debug': function( req, res, next ) {
		if(req.user == undefined && process.env.FORCE_USER != undefined) {		    
			models.User.findOne({'username': process.env.FORCE_USER}, function(err, user) {
				req.logIn(user, function(err) {
					// console.log(user);
					next(err);
			    });
			});
		} else {
			next();
		}
	},
	'login': function( req, res, next ) {
		res.redirect('/auth/facebook');
	},
	'logout': function(req, res, next) {
		req.logout();
		res.redirect('/');
	},
	'facebook': {
	    'confirm': function( req, res, next ) {	     
	        fbid = req.body.data.id;
	        accessToken = req.body.data.accessToken;
	        
	        function fillMusic(user, next) {
	            fbgraph
                    .setAccessToken(user.fbToken)
                    .get("me/music", function(err, fbres) {
                        
                        if(fbres.data != undefined) {
                            artists = [];

                            async.each(fbres.data, function(artist, cb) {
                                models.Artist.modcreate(artist.name, {
                                    name: artist.name,
                                    fbid: artist.id
                                }, function(err, artist) {
                                    if(artist.similar.length == 0) {
                                        artist.fillSimilar();
                                    }

                                    artists.push(artist._id);
                                    cb(err);
                                });
                            }, function(err) {
                                user._artists.facebook = artists;
                                user.save(function(err,n) {
                                    next(user);
                                });
                            });
                        }
                    });
	        };
	        
	        function fillFriends(user, next) {
	            user.getFriends(function(err, friends) {
	                next(user);
	            });
	        }
	        
	        function fillMatches(user, next) {
	            user.getMatches({}, function(err,matches) {
	                next(user);
	            });
	        }
	           
	        models.User.findOne({'fbid': fbid}, function(err, user) {	                       
	            if( user != null ) {
	                if (user.externals.facebook == undefined) {
        		        user.externals.facebook = {};
        		    }
        		    user.externals.facebook.accessToken = accessToken;
        		    user.save(function() {
                        
        		    });
        		    if(user._friends.length == 0) {
                        fillMusic(user, function(user) {
    				        fillFriends(user, function(user) {
    				            fillMatches(user, function(user) {
    				                req.logIn(user, function(err) {
                                        res.send(user.toJSON({'virtuals': true}));
                    			    });
    				            });
    				        });
    				    });
                    } else {
                        req.logIn(user, function(err) {
                            res.send(user.toJSON({'virtuals': true}));
        			    });
                    }
	            } else {	                                
                    fbgraph
                        .setAccessToken(accessToken)
                        .get("me", function(err, profile) {
                            profile.accessToken = accessToken;
                            
                            models.User.create({
                				username: profile.username,
                				displayName: profile.name,
                				fbid: fbid,
                                gender: profile.gender || 'male',
                                status: profile.status || 'Single',
                                location: profile.location,
                				externals: { facebook: profile } },
                				function( err, user ) {
                				    fillMusic(user, function(user) {
                				        fillFriends(user, function(user) {
                				            fillMatches(user, function(user) {
                				                req.logIn(user, function(err) {
                                                    res.send(user.toJSON({'virtuals': true}));
                                			    });
                				            });
                				        });
                				    });
                				}
                			);
                        });
	            }
	        });
	    },
		'start': [
			passport.authenticate('facebook', {scope: ['user_location', 'user_relationships', 'friends_relationships', 'user_relationship_details', 'friends_relationship_details', 'friends_location', 'user_likes', 'friends_likes']})
		],
		'end': [
			passport.authenticate('facebook', { failureRedirect: '/login' }),
			function( req, res, next ) {
				//fill in friends
				req.user.getFriends();
								
				fbgraph
					.setAccessToken(req.user.fbToken)
					.get("me/music", function(err, fbres) {
					    						
						artists = [];
						
						async.each(fbres.data, function(artist, cb) {
							models.Artist.modcreate(artist.name, {
								name: artist.name,
								fbid: artist.id
							}, function(err, artist) {
								if(artist.similar.length == 0) {
									artist.fillSimilar();
								}
								
								artists.push(artist._id);
								cb(err);
							});
						}, function(err) {
							req.user._artists.facebook = artists;
							req.user.save(function(err,n) {
								console.log(err,n);
							})
						});
						
						next();
					});
				
				// next();
			},
			function( req, res, next ) {
				// console.log(req.user);
				res.redirect('/');
			}
		]
	}
}