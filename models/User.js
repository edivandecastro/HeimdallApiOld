const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      index: true,
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

UserSchema.pre('save', async function (next) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  next();
});

module.exports = mongoose.model('User', UserSchema);
