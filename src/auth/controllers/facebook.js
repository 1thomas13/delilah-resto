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
  callbackURL: config.config.authFacebook.callbackURL,
  profileFields: ['id', 'displayName', 'photos', 'email', 'first_name']
},
function (accessToken, refreshToken, profile, done) {
  const payLoad = {
      first_name: profile.name.givenName,
      last_name : profile.name.familyName,
      nickname: profile.displayName,
      enable: true,
      email: profile._json.email,
      accessToken: accessToken
  }
  console.log({mensaje: 'Use FacebookStrategy', payLoad});
  return done(null, payLoad);
}

))