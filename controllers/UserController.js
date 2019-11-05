const User = require('../models/User');

module.exports = {
  async create(req, res) {
    let { user } = req.body;

    User.create(user, (err, user) => {
      if (err) {
        let reason = err.errmsg
        
        if (err.code == "11000") 
          reason = "Username already exists!";

        res.status(400).send({ "message": "There was an error registering the user!", "reason": reason });
      }
      else {
        res.status(200).send({ "message": "Usuário cadastrado com sucesso!", uid: user.id });
      }
    });
  },

  async show(req, res) {
    let id = req.params.id;

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