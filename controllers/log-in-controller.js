const { body, validationResult } = require('express-validator');
const passport = require('passport');

exports.login_get = function (req, res, next) {
  res.render('pages/log-in', { headtitle: 'Message board log-in' });
};

exports.login_post = [
  body('email') //sanitize and validate
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please enter an email.')
    .isEmail()
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please enter a password.')
    .escape(),

  function (req, res, next) {
    const errors = validationResult(req); //get the errors from validation

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        console.log('fail to log in');
        return res.render('pages/log-in', {
          headtitle: 'Message board log-in',
          testUser: { email: req.body.email },
          errors: [{ msg: 'Invalid username or password' }, ...errors.array()],
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Handle success - e.g., redirect to home page
        console.log('log in sucessful');
        return res.redirect('/'); //CHANGE THIS LATER
      });
    })(req, res, next);
  },
];
