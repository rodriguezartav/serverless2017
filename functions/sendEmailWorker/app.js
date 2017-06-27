var Promise = require("bluebird");
var fs = require("fs");
var ParseEmail = require("./helpers/parseEmail");
var SendEmailHelper = require("./helpers/sendEmail");
var DeleteQueueMessage = require("../common/deleteQueueMessage")
var Knex = require("../common/knex");
require("../common/log");

function SendEmail(event,context,callback){
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(JSON.stringify(event));
  var Body = JSON.parse(event.Body);
  this.paciente_id = Body.paciente_id;
  this.emailName = Body.email;

  var _this = this;

  var paciente;
  return Knex.getInstance().table("paciente")
  .select("*")
  .where({id: _this.paciente_id})
  .then( function(result){
  paciente = result[0];
  return Knex.getInstance().table("reservacion")
  .select("*")
  .where({paciente_id: _this.paciente_id})
  })
  .then( function(result){
  paciente.reservacion = result[0];
  paciente.monto = paciente.reservacion.monto;
  console.log(paciente);
  return Knex.getInstance().table("pago")
  .select("*")
  .where({reservacion_id: paciente.reservacion.id})
  })
  .then( function(result){
  paciente.pagos = result;
  //var emailContents = ParseEmail(_this.emailName,paciente);
  return SendEmailHelper("Test Subject",paciente);
  })
  .then( function(res){
  return Knex.getInstance().table("email")
  .insert({nombre: _this.emailName, paciente_id: _this.paciente_id});
  })
  .then( function(){
  return DeleteQueueMessage(event);
  })
  .then( function(){
    callback();
  })
  .catch(function(err){
    //console.log(err);
    console.error(err);
    callback(err);
  })
}



module.exports = SendEmail;
