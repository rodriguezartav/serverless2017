'use strict';
const BbPromise = require('bluebird');
const Deploy = require("../deploy");

class SmartPacker {
  constructor(serverless, options) {
    this.serverless             = serverless;
    this.options                = options;
    this.globalBrowserifyConfig = {};
    var _this = this;


    this.commands = {

    };

    this.zipService = () => BbPromise.bind(this)
      .then(function(){

        const functionNames = this.serverless.service.getAllFunctions();
        const bundleQueue   = functionNames.map(functionName => {
          _this.serverless.cli.log(`Bundling ${functionName} with SmartPacker...`);
          let functionObject           = _this.serverless.service.getFunction(functionName);
          functionObject.artifact  = "./.serverless/"+functionName+".zip";
          return functionName;
        });

        return series(bundleQueue);

      })


    this.hooks = {

      'before:package:createDeploymentArtifacts': this.zipService

    }
  }
}

function series(functionNames) {
  var _this = this;

  var sequence = Promise.resolve();

  functionNames.forEach(function(functionName) {
    // Chain one computation onto the sequence
    sequence = sequence.then(function() {
      return new Deploy(functionName);
    }).then(function(result) {
      return true;
    });

  })

  // This will resolve after the entire chain is resolved
  return sequence;
}

module.exports = SmartPacker;
