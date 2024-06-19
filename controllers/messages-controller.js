const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

exports.message_get = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find()
    .populate('author')
    .sort({ date_created: -1 })
    .limit(50)
    .exec();
  res.render('pages/messages', { headtitle: 'Message Board', posts: allPosts });
});
