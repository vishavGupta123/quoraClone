const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password != password) {
        console.log("Invalid username/password");
        return done(null, false);
      }
      console.log(user);
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding the user");
      return done(null, false);
    }
    return done(null, user);
  });
});

//check is the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in then passs over the request to the next function (controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contained the current sign in user from the session cookie and we just
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
