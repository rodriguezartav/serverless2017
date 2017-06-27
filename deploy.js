var exec = require('child_process').exec;
var fs = require('fs');
var os = require('os');
var rimraf = require("rimraf");


function DeployFunction(functionName){
  var _this = this;

  return _this.rsync('./functions/' + functionName  + '/node_modules', "./functions")
  .then( function(){
    return _this.zip(functionName)
  })
  .then( function(){
    return _this.rsync("functions/node_modules", './functions/' + functionName);
  })
}



DeployFunction.prototype.rsync = function (source, destination) {
  function promise(resolve,reject){

    exec('rsync -r '+ source + '  ' + destination , function (err) {
      if (err) console.log("Could not find " + source)
      rimraf.sync(source);
      return resolve(true);
    });
  }
  return new Promise(promise);
};

DeployFunction.prototype.zip = function(functionName){
  function promise(resolve,reject){
    var zipfile = functionName+'.zip';
    rimraf.sync("./.serverless/" + functionName +".zip");
    cmd = 'zip -r ../.serverless/' + zipfile + ' ' + functionName + '/* ./common/* ./node_modules/*';
    exec(cmd, {
      cwd: "./functions",
      maxBuffer: 50 * 1024 * 1024
    }, function(err) {
      if(err){
        console.log(err);
        return reject("Can't zip function " + functionName + ". Check folder, function name, etc.");
      }
      var data = fs.readFile("./.serverless/"+zipfile, function(err,data){
        if(err) reject("Can't find zip file in ./serverless/"+zipfile);
        else resolve(data);
      });
    })
  }
  return new Promise(promise);
}



module.exports = DeployFunction;
