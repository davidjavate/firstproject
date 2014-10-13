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

app.use(cookieSession( {
  secret: 'thisismysecretkey',
  name: 'session with cookie data',
  // this is in milliseconds
  maxage: 360000
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//User Authentication

passport.serializeUser(function(user, done){
  console.log("SERIALIZED JUST RAN!");
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log("DESERIALIZED JUST RAN!");
  db.user.find({
      where: {
        id: id
      }
    })
    .done(function(error,user){
      done(error, user);
    });
});


app.get("/", function(req,res){
	res.redirect('/allevents');
});


//Showing all Events
app.get('/allevents',function(req,res) {
	db.event.findAll().success(function(taco){
		res.render('events/allevents', {events: taco});
	});

	});

//Show one event
app.get('/event/:id', function(req,res) {
	var eventid = req.params.id;
	db.event.find(eventid).success(function(taco){
		res.render('events/event', {event: taco, id: eventid});
	});
});

//Login form
app.get('/login', function(req,res) {
	if(!req.user) {
	res.render('forms/login', {message: req.flash('loginMessage'),username: ""});
}
else {
	res.redirect('/allevents');
}
});

//Signup form
app.get('/signup', function(req,res) {
	if(!req.user) {
	res.render('forms/signup', {message: null, username: ""});
	}
  else{
    res.redirect('/allevents');
  }
});

//Add Event
app.get('/addevent', function(req,res) {
	res.render('forms/addevent', {username: ""});
});


//User favorited events

app.get("/user", function(req, res){
if(req.user){
	db.user.find(req.user.id).success(function(userFromDb) {

  		userFromDb.getEvents().success(function (myEvents) {
  			var myEvents = myEvents;

  			console.log("myEvents" +  JSON.stringify(myEvents));
			res.render('people/user', {
	  			myEvents: myEvents,
	  			isAuthenticated: req.isAuthenticated(),
 				user: req.user
	  		})
		})
  	})
} else {
	res.redirect('/login');
}
})


//DJ Profile
app.get('/dj', function(req,res) {
	res.render('people/dj', {});
});

//Creating a new user
app.post('/signup', function(req, res) {
	db.user.createNewUser(req.body.username, req.body.password,
		function(err) {
			res.render('forms/signup', {message: err.message, username: req.body.username});
		},
		function(success) {
			db.event.findAll().success(function(eventObjects){
				//console.log(eventObjects);
				res.render('events/allevents',{events: eventObjects, message: success.message});
			});
		});
});

//Adding an event
app.post('/addevent', function(req,res){
	db.event.create({
		title: req.body.title,
		date: req.body.eventdate,
		djs: req.body.djs,
		body: req.body.body,
		flyerlink: req.body.flyerlink
	}).success(function(event){
		//console.log(event);
	});
	res.redirect('/allevents');

});



app.post('/favorites', function(req, res){
  var eventTitle = req.body.title;
  var eventDate = req.body.eventdate;
  var eventid = req.body.eventid;
  console.log(eventid)
  //console.log("isAuthenticated", req.isAuthenticated());
  console.log(req.user);
  db.event_users
  .create({userId: req.user.id, eventId: eventid})
  .success(function(event_user){
  	 res.redirect('/allevents');
  })


});

// app.delete("/favorites/:id", function(req, res) {
//   var id = req.params.id;
//   var eventIndex;
//   favoriteEvents.forEach(function(event, index) {
//     if (event.id === id) {
//       eventIndex = index;
//     }
//   });
//   favoriteEvents.splice(eventIndex, 1);
//   res.redirect("/allevents");
// });


app.post('/login', passport.authenticate('local', {
  successRedirect: '/allevents',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/logout', function(req,res){
  //req.logout added by passport - delete the user id/session
  console.log("LOGGING OUT")
  req.logout();
  res.redirect('/');
});


app.get("*", function(req,res){
	res.render("404");
});



app.listen(process.env.PORT || 3000, function() {
		console.log('The Server is running!');
	});