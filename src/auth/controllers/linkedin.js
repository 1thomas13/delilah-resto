const passport = require('passport');
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const config = require("../../config")


passport.serializeUser(function (user, done) {
 
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


passport.use(new LinkedinStrategy({
  clientID: config.config.authLinkedin.clientID,
  clientSecret: config.config.authLinkedin.clientSecret,
  callbackURL: config.config.authLinkedin.callbackURL
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
))