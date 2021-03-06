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

  async show(req, res) {
    const { id } = req.params;

    const rule = await Rule.findById(id);

    if (rule) {
      res.status(200).send(rule);
    }
    else  {
      res.status(404).send({ message: "Rule not found!" });
    }
  },

  async showRulesOfUser(req, res) {
    const { id } = req.params

    const rules = await Rule.find({ user_id: id });

    if (rules && rules.length > 0) {
      res.status(200).send({ rules });
    }
    else {
      res.status(404).send({ message: "There are no rules for this user" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { actions } = req.body;

    let rule = await Rule.findById(id);

    if (rule) {
      rule.actions = actions

      if (await rule.save()) {
        res.status(200).send({ message: "Rule updated with success!", rule });
      }
      else {
        res.status(400).send({ "message": "An unexpected error occurred!" });
      }
    }
    else {
      res.status(404).send({ message: "Rule not found!" });
    }
  },

  async updateByUserAndResource(req, res) {
    const { conditions, actions } = req.body;

    await Rule.updateOne(conditions, { actions: actions }, (err, result) => {
      if (!err) {
        if (result.n > 0) {
          Rule.findOne(conditions, (err, rule) => {
            res.status(200).send({ message: "Rule updated with success!", rule });
          });
        }
        else {
          res.status(404).send({ message: "Rule not found!" });
        }
      }
      else {
        res.status(400).send({ "message": "There is already a rule created for this user and resource!" });
      }
    });
  },

  async destroyAction(req, res) {
    const { id, action } = req.params;

    await Rule.updateOne({ "_id": id }, { $pull: { actions: { $in: [action] }}}, (err, result) => {
      if (!err) {
        if (result.n > 0) {
          if (result.nModified > 0) {
            res.status(200).send({ message: "Action in rule removed with success!" });
          }
          else {
            res.status(400).send({ message: "Action not found!" });
          }
        }
        else {
          res.status(404).send({ message: "Rule not found!" });
        }
      }
      else {
        res.status(400).send({ message: "There is already a rule created for this user and resource!" });
      }
    });
  },

  async addAction(req, res) {
    const { id, action } = req.params;

    const rule = await Rule.findOne({ "_id": id });

    if (rule) {
      if (rule.actions.includes(action.toLowerCase())) {
        res.status(400).send({ message: "This action has already been added to this resource!" });
      }
      else {
        rule.actions.push(action);

        if (rule.save()) {
          res.status(200).send({ message: "Action added with success!" });
        }
        else {
          res.status(400).send({ message: "An unexpected error occurred!" });
        }
      }
    }
    else {
      res.status(404).send({ message: "Rule not found" });
    }
  },

  async authorize(req, res) {
    const { user_id, resource, action } = req.body;

    Rule.find({ user_id, resource, actions: action }, (err, rule) => {
      if (rule.length > 0)
        res.status(200).send({ access: true });
      else
        res.status(401).send({ access: false });
    });
  }
}
