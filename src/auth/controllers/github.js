const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const config = require("../../config")


passport.serializeUser(function (user, done) {
 
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


passport.use(new GitHubStrategy({
  clientID: config.config.authGitHub.clientID,
  clientSecret: config.config.authGitHub.clientSecret,
  callbackURL: config.config.authGitHub.callbackURL
},
  function (accessToken, refreshToken, profile, done) {
    const payload = {

      name: profile.displayName,
      email: profile.emails[0].value
    }
    return done(null, payload);
  }
))