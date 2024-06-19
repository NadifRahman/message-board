const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  msg: { type: String, maxLength: 280, required: true },
});

module.exports = mongoose.model('Post', PostSchema);
