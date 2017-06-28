var AWS = require("aws-sdk");
var lambda = new AWS.Lambda({region: process.env.AWS_REGION});

function invokeWorkerLambda(lambdaName,event, callback) {
  if(process.env.IS_TEST) callback(null,{});

  var params = {
    FunctionName: lambdaName,
    InvocationType: 'Event',
    Payload: JSON.stringify(event)
  };
  console.log("invoking",params)
  lambda.invoke(params, function(err, data) {
    console.log(arguments);
    if (err) callback(err);
    else callback(null,data)
  });

}

module.exports = invokeWorkerLambda;


