if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const config = require('./config');
var db = config.DB[process.env.NODE_ENV] || process.env.DB;
var PORT = config.PORT[process.env.NODE_ENV];
const apiRouter = require('./routes/api');

mongoose.connect(db, function (err) {
  if (!err) {
    console.log(`connected to the Database: ${db}`);
  } else {
    console.log(`error connecting to the Database ${err}`);
  }
});

app.use(cors());

app.use(bodyParser.json());

app.use('/api',apiRouter);

app.use('/*',function (req, res) {
  res.status(404).send({status:'404 NOT FOUND'});
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

app.use(function (err, req, response, next) {
    if (err.name === 'CastError') {
        return response.status(400).send({
            reason: `No id ${err.value} found`,
            stack_trace: err
        });
   }
   return next(err);
});

app.use(function (err, req, res) {
    return res.status(500).send({error: err});
});