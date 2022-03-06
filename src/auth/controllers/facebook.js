const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require("../../config")


passport.serializeUser(function (user, done) {
 
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


passport.use(new FacebookStrategy({
  clientID: config.config.authFacebook.clientID,
  clientSecret: config.config.authFacebook.clientSecret,
  callbackURL: config.config.authFacebook.callbackURL
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
))