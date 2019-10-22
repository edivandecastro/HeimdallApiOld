const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model('User', UserSchema);
