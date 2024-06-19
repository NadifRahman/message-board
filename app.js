const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const compression = require('compression');
const helmet = require('helmet');

require('dotenv').config();

//IMPORT ROUTERS
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//CREATE APP
const app = express();

//Limiter
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: 'Too many requests, please wait',
}); //1 minute window, max 80 requests per min
app.use(limiter);

//CONFIG THE DATABASE
require('./config/database.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARE SETUP
/**
 * Set up rate limiter, helmet, compression and possible CORS bypass later
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

//SESSION MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), //use session store
  })
);
app.use(passport.session());

//PASSPORT CONFIG
require('./config/passport.js');

//SET LOCAL RESPONSE VARIABLE
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

//ROUTERS
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.statusCode = err.status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { headtitle: 'ERROR' });
});

module.exports = app;
