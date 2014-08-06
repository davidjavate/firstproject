var express = require('express'),
	ejs = require('ejs'),
 	bodyParser = require("body-parser"),
  	passport = require("passport"),
  	passportLocal = require("passport-local"),
  	cookieParser = require("cookie-parser"),
  	cookieSession = require("cookie-session"),
  	db = require("./models/index"),
  	flash = require('connect-flash'),
	app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}) );
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var favoriteEvents=[];

app.use(cookieSession( {
  secret: 'thisismysecretkey',
  name: 'session with cookie data',
  // this is in milliseconds
  maxage: 360000
  })
);

app.get("/", function(req,res){
	res.redirect('login');
});

//Showing all Events
app.get('/allevents',function(req,res) {
	db.event.findAll().success(function(taco){
		console.log(taco);
		res.render('events/allevents', {events: taco});
	}
);
		
	});

//Show one event
app.get('/event/:id', function(req,res) {
	res.render('events/event', {});
});

//Login form
app.get('/login', function(req,res) {
	res.render('forms/login', {username: ""});
});

//Signup form
app.get('/signup', function(req,res) {
	res.render('forms/signup', {message: null, username: ""});
});

//Add Event
app.get('/addevent', function(req,res) {
	res.render('forms/addevent', {username: ""});
});

//User Profile
app.get('/user', function(req,res) {
	res.render('people/user', {});
});

//DJ Profile
app.get('dj/:dj', function(req,res) {
	res.render('people/dj', {});
});

//Creating a new user
app.post('/signup', function(req, res) {
	db.user.createNewUser(req.body.username, req.body.password,
		function(err) {
			res.render('signup', {message: err.message, username: req.body.username});
		},
		function(success) {
			res.render('events/allevents',{message: success.message});
		});
		});
app.post('/addevent', function(req,res){
	db.event.create({
		title: req.body.title,
		date: req.body.eventdate,
		djs: req.body.djs,
		body: req.body.body
	}).success(function(event){
		console.log(event);
	});
	res.redirect('/user');

});


app.get("*", function(req,res){
	res.render("404");
});



app.listen(3000, function() {
		console.log('The Server is listening on localhost: 3000');
	})