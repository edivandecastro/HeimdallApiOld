require('./config/database');

const express = require('express');
const cors = require('cors');
const router = require('./config/routes');

const app = express();

app.use(cors());
app.use('/heimdall', router);

const port = 3002

app.listen(port, () => {
  console.log(`Server wake up!! port[${port}]`);
});
