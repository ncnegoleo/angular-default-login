/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', router);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// def port
const PORT = process.env.port || 4000;

// listen for requests
app.listen(PORT, function () {
    console.log(`now listen for requests in port: ${PORT}`);
});
