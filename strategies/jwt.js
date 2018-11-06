const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY_JWT;

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
  if (jwt_payload.username === "admin@example.com") {
    return done(null, true);
  }
  return done(null, false, { messasge: "hello man" });
});
