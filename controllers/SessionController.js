const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = {
  async authenticate(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');

    if (!user) 
      return res.status(404).send({ error: "User not found!" });
    
    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: "Invalid password!" });
    
    res.send({ user });
  }
}