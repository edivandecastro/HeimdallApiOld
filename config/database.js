const mongoose = require('mongoose');

config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-hfiub.mongodb.net/heimdall?retryWrites=true&w=majority', config);
//mongoose.connect('mongodb://localhost:27017/heimdall', config);

module.exports = mongoose;
