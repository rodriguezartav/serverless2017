var LAMBDA_FUNCTION_NAME='email-SendEmailWorker';
var Promise = require("bluebird");
var async = require("async");

var ReceiveMessages = require("../common/getQueueMessages");
var InvokeLambda = require("../common/invokeLambda");
require("../common/log");

function SqsBulkEmailConsumer(event, context, callback){
  ReceiveMessages()
  .then(function(messages){
    if(!messages || messages.length ==0) return false
    return parallel(messages);
  })
  .then(function(){
    callback();
  })
  .catch( function(err){
    console.error(err);
    callback(err);
  })
}

function parallel(messages){
  function promise(resolve, reject){
    var invocations = [];
    messages.forEach(function(message) {
     invocations.push(function(callback) {
       InvokeLambda(LAMBDA_FUNCTION_NAME, message, callback);
     });
   });
   async.parallel(invocations, function(err) {
     if (err) reject(err);
     else resolve(true);
   });
  }
  return new Promise(promise);
}


module.exports = SqsBulkEmailConsumer;
