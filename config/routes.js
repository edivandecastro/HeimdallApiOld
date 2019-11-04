const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/User');

const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-hfiub.mongodb.net/heimdall?retryWrites=true&w=majority', config);
//mongoose.connect('mongodb://localhost:27017/heimdall', config);

router.post('/authenticate', SessionController.authenticate);
router.post('/users', UserController.create);
router.get('/users/:uid', UserController.show);

module.exports = router;
