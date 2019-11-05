require('./config/database');

const express = require('express');
const router = require('./config/routes');

const app = express();

app.use('/heimdall', router);

app.listen(3001, () => {
  console.log("Server wake up!!");
});
