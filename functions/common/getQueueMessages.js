var AWS = require("aws-sdk");
var sqs = new AWS.SQS({region: process.env.AWS_REGION});
var Promise = require("bluebird");

function receiveMessages() {
  if(process.env.IS_TEST) return Promise.resolve([]);

  function promise(resolve, reject){
    var params = {
      QueueUrl: process.env.TASK_QUEUE_URL,
      MaxNumberOfMessages: 10
    };
    sqs.receiveMessage(params, function(err, data) {
      if (err) reject(err);
      else{
        console.log(data)
        resolve(data.Messages)
      }
    });
  }
  return new Promise(promise);
}

module.exports = receiveMessages;
