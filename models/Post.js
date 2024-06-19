const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  msg: { type: String, maxLength: 280, required: true },
  date_created: { type: Schema.Types.Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
