let Rule = require('../models/Rule')
let User = require('../models/User')

let result = (user) => {
  console.log(user);
}

module.exports = {
  async create(req, res) {
    let { rule } = req.body;

    User.findById(rule.user_id, (err, user) => {
      if (user) {

        Rule.find({ user_id: rule.user_id, resource: rule.resource }, (err, rules) => {

          if (!rules || rules.length == 0) {
            Rule.create(rule, (err, rule) => {

              if (err) {
                let reason = err.errmsg

                if (err.code == "11000")
                  reason = "There is already a rule created for this user and resource!";

                res.status(400).send({ "message": "There was an error registering the rule!", "reason": reason });
              }
              else {
                res.status(200).send({ "message": "Rule registered with success!", "rule": rule })
              }
            });
          }
          else {
            res.status(400).send({ "message": "There is already a rule created for this user and resource!" });
          }
        });
      }
      else {
        res.status(404).send({ "message": "User not found!" });
      }
    });
  }
}
