/*
Code pulled from :

https://medium.com/geekculture/sign-in-through-steam-using-nodejs-e3202d4719

*/
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var passportSteam = require('passport-steam');
var SteamStrategy = passportSteam.Strategy;
var app = express();

var port = 3000;

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

// Initiate Strategy
passport.use(new SteamStrategy({
	returnURL: 'http://localhost:' + port + '/api/auth/steam/return',
	realm: 'http://localhost:' + port + '/',
	apiKey: 'B423175B1FA7B513516CEC7BFD995F47'
	}, function (identifier, profile, done) {
		process.nextTick(function () {
			profile.identifier = identifier;
			return done(null, profile);
		});
	}
));

app.use(session({
	secret: '8X3P1TIX8ZQK8MB1VWHHB64MZ3AUM623',
	saveUninitialized: true,
	resave: false,
	cookie: {
		maxAge: 3600000
	}
}));

app.use(passport.initialize());

app.use(passport.session());

// Initiate app
app.listen(port, () => {
	console.log('Listening, port ' + port);
});

app.get('/', (req, res) => {
	console.log(req.user);
	res.send(req.user);
});

// Routes
app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('/')
});

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('/')
});

// var userinfo = req.user;
// var steamgames = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=B423175B1FA7B513516CEC7BFD995F47&steamid='+ userinfo.steamid +'&format=json';

