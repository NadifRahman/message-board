const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 20 },
  last_name: { type: String, required: true, maxLength: 20 },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], //uses regex for email,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  isAdmin: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('User', UserSchema);
