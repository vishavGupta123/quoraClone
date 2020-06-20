const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const env = require("./environment");

const User = require("../models/user");

//tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID: env.google_client_iD,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_callback_url,
    },
    function (accessToken, refreshToken, profile, done) {
      //find a user if found set this user as req.user
      User.findOne({ username: profile.displayName }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error", err);
          return;
        }
        console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          //if not found create the user and set it as req.user
          User.create(
            {
              email: profile.emails[0].value,
              username: profile.displayName,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("error in creating user", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
