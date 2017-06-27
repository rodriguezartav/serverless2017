//var dotenv = require("dotenv");
//dotenv.load();

var AWS = require('aws-sdk');
var ses = new AWS.SES({apiVersion: '2010-12-01'});

var Promise = require("bluebird");

//var Knex = require("../helpers/knex");
var fs = require("fs");

function SendEmail(emailSubject, paciente, emailContent){

  var emailData = {
    from: 'Carolina Dada <roberto@rodcocr.com>',
    bcc: "roberto@3vot.com",
    to: paciente.email,
    subject: emailSubject};

    return sendHTML(paciente.email);
}



function sendHTML(email){
  return new Promise(function(resolve,reject){
    if(process.env.IS_TEST) resolve("ok");

    /* The following example sends a formatted email: */

     var params = {
      Destination: {
       //BccAddresses: [
       //],
       //CcAddresses: [
        //  "recipient3@example.com"
       //],
       ToAddresses: [email]
      },
      Message: {
       Body: {
        Html: {
         Charset: "UTF-8",
         Data: "This message body contains HTML formatting. It can, for example, contain links like this one: <a class=\"ulink\" href=\"http://docs.aws.amazon.com/ses/latest/DeveloperGuide\" target=\"_blank\">Amazon SES Developer Guide</a>."
        },
        Text: {
         Charset: "UTF-8",
         Data: "This is the message body in text format."
        }
       },
       Subject: {
        Charset: "UTF-8",
        Data: "Test email"
       }
      },
      Source: "Carolina Dada <roberto@rodcocr.com>"
     };
     ses.sendEmail(params, function(err, data) {
       if (err) reject(err)
       else  resolve(data)
       /*
       data = {
        MessageId: "EXAMPLE78603177f-7a5433e7-8edb-42ae-af10-f0181f34d6ee-000000"
       }
       */
     });
  })
}

module.exports = SendEmail;
