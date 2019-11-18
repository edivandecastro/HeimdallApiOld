const mongoose = require('mongoose');

const RuleSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resource: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
  },
  actions: [{
    type: String,
    required: true,
    lowercase: true,
  }],
});

RuleSchema.index({ user_id: 1, resource: 1 }, { unique: true });

module.exports = mongoose.model('Rule', RuleSchema);
