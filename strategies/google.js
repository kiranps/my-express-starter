const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

module.exports = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    //   User.findOrCreate({ googleId: profile.id }, function(err, user) {});
    return done(null, profile);
  }
);
