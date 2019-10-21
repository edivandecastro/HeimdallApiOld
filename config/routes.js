const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb://localhost:27017/heimdall', config);

let userSchema = new mongoose.Schema({
  username: String,
  password: String
});

let User = mongoose.model('User', userSchema);

router.post('/users', (req, res) => {
  let user = new User({ username: req.body.username, password: req.body.password });
  user.save;
  res.json({ message: "Usuário salvo com sucesso!", uid: user._id });
});

router.get('/users/:uid', (req, res) => {
  let usuario = User.findById(req.params.uid);
  console.log(req.params.uid);
  console.log(usuario);
  res.json({ "message": "oi"});
});

module.exports = router;
