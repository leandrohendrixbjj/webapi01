const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const authentication = require('./middleware/authentication.js');

// Path to Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const keysRouter = require('./routes/keys');

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/users', authentication, usersRouter);
app.use('/keys', keysRouter);

// error handler
app.use(function (err, req, res, next) {
  console.error(error);
  res.sendStatus(err.status || 500);
});

module.exports = app;
