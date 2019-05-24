require("dotenv").config();
var express = require("express");
var db = require("./models");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var path = require('path')
var session = require('express-session')
var app = express();
var PORT = process.env.PORT || 3000;


// Middleware
app.use('/js',express.static(path.join(__dirname, 'public/js')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
express.static(path.join(__dirname, 'public'))

// Auth 
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
//app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

  // parse application/json
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'shgpkwtvqv',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
//===========================================
//passport config 
//===========================================
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));



module.exports = app;
