const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

module.exports = function (passport) {
  // Local Authentication
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ where: { username: username } })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        })
        .catch((err) => done(err));
    })
  );

  // Google OAuth2.0 Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: 'your-google-client-id',
        clientSecret: 'your-google-client-secret',
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // Handle user creation or login with Google profile here
        // You can use profile.id or other unique information to find or create a user
        // Call done(null, user) when the user is found or created
      }
    )
  );

  // Serialize and Deserialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};
