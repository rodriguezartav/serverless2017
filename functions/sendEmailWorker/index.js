'use strict';
var SendEmailWorker = require("./index");

exports.handler = (event, context, callback) => {
  SendEmailWorker(event,context,callback);
  console.log(ok);
};
