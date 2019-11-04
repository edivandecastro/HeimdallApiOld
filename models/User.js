const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  { strict: true }
);

module.exports = mongoose.model('User', UserSchema);
