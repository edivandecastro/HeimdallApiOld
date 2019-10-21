const express = require('express');
const router = require('./config/routes');

const app = express();

app.use('/', router);

app.listen(3001, () => {
  console.log("Server iniciado!!");
});
