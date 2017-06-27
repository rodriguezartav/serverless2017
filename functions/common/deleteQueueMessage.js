var AWS = require("aws-sdk");
var sqs = new AWS.SQS({region: process.env.AWS_REGION});
var Promise = require("bluebird");

function DeleteQueueMessage(event){
  if(process.env.IS_TEST) return Promise.resolve(true);

  var promise = function(resolve, reject){
    sqs.deleteMessage({
       ReceiptHandle: event.ReceiptHandle,
       QueueUrl: process.env.TASK_QUEUE_URL
     }, function(err, res){
       if(err) reject(err);
       else resolve(res);
     });
  }
  return new Promise(promise);
}

module.exports = DeleteQueueMessage
