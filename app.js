const createError = require('http-errors');
const express = require('express');
jsonrpc = require('node-express-json-rpc2-async');
const cors = require('cors');

const app = express();
app.use(express.json()) 
app.use(cors());
app.use(jsonrpc());

const rpcs = require('./routes/rpcs');
app.use('/', rpcs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500).json({
    message: err.message,
    error: err
  });
});

// chain을 전역으로 생성
chain = require('./blockchain/chain');

module.exports = app;
