process.env.IS_TEST = true;
var chai = require('chai');
var should = chai.should();
var dotenv = require("dotenv").config();

var Test = require("../functions/test").handler;
var event = require("../functions/test/event.json");

describe('First Test', () => {

  before(function (done) {
    done();
  });

  after(function (done) {
    done();
  });


  describe('Test On', () => {
    it('it should pass', function(done){
      Test(event,{}, function(){
        done();
      })
    });
  });

});
