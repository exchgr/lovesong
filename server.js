var express = require('express')
		, http = require('http')
		, url = require('url')
		, async = require('async')
		, request = require('request')
		, mongoose = require('mongoose')
		, passport = require('passport')
		, _ = require('./public/lib/underscore')
		
var pkg = require('./package.json')
		, main = require('./routes/main')
		, auth = require(__dirname+'/lib/auth')

// set up Mongoose
mongoose.connect('localhost', pkg.name);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('Connected to DB');
});

var app = express();
// configure Express
app.configure(function() {
	app.set('port', process.env.PORT || 5000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser( process.env.SECRET ));
	app.use(express.session({ key: 'lovesong.sess', secret: process.env.SECRET }));

	// Passport
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(auth.debug);

	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(__dirname + '/public'));
});

// set up routes
app.get('/', main.index);

// --- facebook
app.get('/auth/facebook', auth.facebook.start);
app.get('/auth/facebook/callback', auth.facebook.end);

// start listening
app.listen( process.env.PORT, function() {
  console.log('Express server listening on port ' + process.env.PORT);
});