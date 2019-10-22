const User = require('../models/User');

module.exports = {
  create(req, res) {
    let { user } = req.body;

    User.create(user, (err, user) => {
      if (err) {
        res.json({ "message": "Ocorreu um erro ao cadastrar o usuário!", "reason": err.reason });
      }
      else {
        res.json({ "message": "Usuário cadastrado com sucesso!", uid: user.id });
      }
    });
  },

  show(req, res) {
    let id = req.params.uid;

    User.findById(id, (err, user) => {
      if(user) {
        res.json(user);
      }
      else {
        res.json({ "message": "Não foi encontrado usuário para o parametro informado." });
      }
    });
  }
}