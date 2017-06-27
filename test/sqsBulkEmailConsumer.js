//Require the dev-dependencies
process.env.IS_TEST = true;
var chai = require('chai');
var should = chai.should();

var SqsBulkEmailConsumer = require("../functions/sqsBulkEmailConsumer/app");

describe('sqs', () => {

  before(function (done) {
    done();
  });

  after(function (done) {
    done();
  });

  describe('send email', () => {
    it('should check messages', function(done){
      SqsBulkEmailConsumer({},{},done);
    })
  });

});
