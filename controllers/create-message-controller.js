const { body, validationResult } = require('express-validator');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

exports.createMessage_get = function (req, res, next) {
  res.render('pages/create-message', {
    headtitle: 'Message Board Create Message',
  });
};

exports.createMessage_post = [
  body('msg')
    .trim()
    .isLength({ min: 1 })
    .withMessage('A message is required')
    .isLength({ max: 280 })
    .withMessage('Character limit of 280 exceeded')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!req.isAuthenticated()) {
      res.render('pages/create-message', {
        headtitle: 'Message Board Create Message',
      });
      return;
    }

    if (!errors.isEmpty()) {
      res.render('pages/create-message', {
        headtitle: 'Message Board Create Message',
        errors: errors.array(),
      });
      return;
    }

    const newPost = new Post({
      author: req.user._id,
      msg: req.body.msg,
    });

    await newPost.save();
    res.redirect('/message-board');
  }),
];
