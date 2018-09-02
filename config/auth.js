const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../api/models/user');
const ADMINS = ['gtripoli@gmail.com', 'paulbredenberg@gmail.com'];
const mongoose = require('mongoose');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' ?
      "https://www.paulandgeoff.com/auth/google/callback" :
      'http://localhost:9000/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    const userData = {
      googleName: profile.displayName,
      googleEmail: (profile.emails || []).map((emailData) => emailData.value)[0],
      googleToken: accessToken,
      googleId: profile.id,
    };

    userData.isAdmin = ADMINS.indexOf(userData.googleEmail) >= 0;
    User.findOneAndUpdate({googleId: profile.id}, userData, {
      new: true,
      upsert: true
    }, (err, user) => {
      done(err, user);
    });
  }
));

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = (app) => {
  app.use(session({
    secret: 'stuffandthings',
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      expires: false
    },
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.get('/api/me', (req, res) => {
    res.json(req.user);
  });
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.json();
  });
  app.get('/auth/google', passport.authenticate('google', {scope: ['openid', 'profile', 'email']}));
  app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
      res.redirect('/');
    });
};
