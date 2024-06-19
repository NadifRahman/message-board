const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });

        if (!user) {
          //if no user found with such email
          return done(null, false, { message: 'Incorrect email' });
        }

        const match = await bcrypt.compare(password, user.hashedPassword); //try to match hashed password

        if (!match) {
          //if pass does not match
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user); //otherwise no issues
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
