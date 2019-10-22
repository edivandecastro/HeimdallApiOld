const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/User');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-hfiub.mongodb.net/heimdall?retryWrites=true&w=majority', config);
//mongoose.connect('mongodb://localhost:27017/heimdall', config);

router.post('/authenticate', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username, password: password }, (err, user) => {
    if (!err) {
      res.json({ success: "true", token: "ghjsdhqnauauqj1du701ua01", "user": user });
    }
    else {
      res.json({ success: false });
    }
  })
});

router.post('/users', UserController.create);

router.get('/users/:uid', UserController.show);

module.exports = router;
