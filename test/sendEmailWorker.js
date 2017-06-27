
//Require the dev-dependencies
process.env.IS_TEST = true;
var chai = require('chai');
var should = chai.should();

var SendSingleEmail = require("../functions/sendEmailWorker/app.js");
var knex = require("../functions/common/knex");

process.env.DEBUG = "knex:tx";
var pacienteId;
//Our parent block
describe('Send Single Email', () => {

  before(function (done) {
   knex.getInstance().table("paciente")
   .insert({nombre: "registrado", email:"roberto+test@3vot.com",telefono: "1234555"})
   .returning("id")
   .then(function(res){
      pacienteId = res[0]
      return knex.getInstance().table("reservacion")
      .insert({paciente_id: pacienteId,monto: 100})
      .returning("id")
   })
   .then(function(){
    return done();
   })

  });

  after(function (done) {
    knex.getInstance().table("email")
    .delete()
    .where({paciente_id: pacienteId})
    .then( function(){
      return knex.getInstance().table("reservacion")
      .delete()
      .where({paciente_id: pacienteId})
    })
    .then( function(){
      return knex.getInstance().table("paciente")
      .delete()
      .where({id: pacienteId})
    })
    .then(function(res){
       return done()
    })
    .catch(function(err){
      return done(err);
    })
  });


  describe('send email', () => {
    it('it should send email', function(done){
      var event = { Body: JSON.stringify({ email: "registrado", paciente_id: pacienteId }) }
      var s = new SendSingleEmail(event,{},function(err,ok){
        if(err) done(err);
        else done();
      })
    });
  });

});
