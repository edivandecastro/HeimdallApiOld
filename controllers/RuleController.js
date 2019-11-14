const Rule = require('../models/Rule');
const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const { rule } = req.body;

    await User.findById(rule.user_id, (err, user) => {
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
  },

  async destroy(req, res) {
    const { id } = req.params;

    const result = await Rule.deleteOne({ "_id": id });

    if (result.deletedCount > 0)
      res.status(200).send({ message: "Rule deleted with success!" });
    else
      res.status(404).send({ message: "Rule not found!" });
  },

  async userHasResourceAndAction(req, res) {
    const { user_id, resource, action } = req.body;

    Rule.find({ user_id, resource, action }, (err, rule) => {
      if (rule.length > 0)
        res.status(200).send({ access: true });
      else
        res.status(401).send({ access: false });
    });
  }
}
