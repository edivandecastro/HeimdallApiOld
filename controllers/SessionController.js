const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

module.exports = {
  async authenticate(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');

    if (!user)
      return res.status(404).send({ error: "User not found!" });

    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: "Invalid password!" });

    user.password = undefined;

    const payload = {
      "sub": user.id
    }

    const token = jwt.sign(payload, authConfig.secret, {
      expiresIn: "2h",
      issuer: "HeimdallApi",
      audience: "token do cliente"
    });

    res.send({ user, token });
  },

  async tokenValidate(req, res) {
    res.send({ "success" : "Token valid" });
  }
}
