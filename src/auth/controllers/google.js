const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require("../../config")


passport.serializeUser(function (user, done) {
 
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


passport.use(new GoogleStrategy({
  clientID: config.config.authGoogle.clientID,
  clientSecret: config.config.authGoogle.clientSecret,
  callbackURL: config.config.authGoogle.callbackURL
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
))