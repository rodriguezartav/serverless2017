'use strict';
var SqsBulkEmailConsumer = require("./app");

exports.handler = (event,context,callback) => {
  SqsBulkEmailConsumer(event,context,callback);
}
