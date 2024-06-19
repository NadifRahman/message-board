const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

exports.signup_get = function (req, res, next) {
  res.render('pages/sign-up', { headtitle: 'Message Board Sign up' });
};

exports.signup_post = [
  body('first_name')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Please enter a first name.')
    .isAlpha()
    .withMessage('First Name - Enter letters only.')
    .escape(),
  body('last_name')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Please enter a last name.')
    .isAlpha()
    .withMessage('Last Name - Enter letters only.')
    .escape(),
  body('email')
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

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req); //get the errors from request
    //FORGOT CONST
    const testUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      hashedPassword: req.body.password, //NOT HASHED
    });

    const userExists = await User.exists({ email: req.body.email }); //attempt to find if document with email exists

    if (userExists) {
      errors.errors.push({ msg: 'User with email already exists' }); //push an error to array
    }

    if (!errors.isEmpty()) {
      res.render('pages/sign-up', {
        headtitle: 'Message Board Sign-up',
        testUser: testUser,
        errors: errors.array(),
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        // if err, do something
        // otherwise, store hashedPassword in DB
        if (err) return next(err);
        try {
          const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            hashedPassword: hashedPassword, //HASHED
          });
          const result = newUser.save(); //SAVE TO DATABASE

          res.redirect('/users/log-in');
        } catch (err) {
          return next(errors);
        }
      });
    }
  }),
];
