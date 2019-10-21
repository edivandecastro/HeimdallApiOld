const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-hfiub.mongodb.net/heimdall?retryWrites=true&w=majority', config);

let userSchema = new mongoose.Schema({
  username: String,
  password: String
});

let User = mongoose.model('User', userSchema);

router.post('/users', (req, res) => {
  let user = new User({ username: req.body.username, password: req.body.password });

  User.create({ "username": user.username, "password": user.password }, (err, user) => {
    if (err) return handleError(err);
  });

  res.json({ message: "Usuário salvo com sucesso!", uid: user.id });
});

router.get('/users/:uid', (req, res) => {
  let id = "5dae31155a1bb3363c9746c9"
  
  User.findById(id, (err, user) => {
    console.log(user);
    console.log(err);
  });
  res.json({});
});

module.exports = router;
