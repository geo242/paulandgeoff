const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  googleName: String,
  googleToken: String,
  googleEmail: String,
  isAdmin: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;
