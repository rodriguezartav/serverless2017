'use strict';
const BbPromise = require('bluebird');
const Deploy = require("../deploy");

class SlsBrowserify {
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
          let functionObject           = _this.serverless.service.getFunction(functionName);
          this.serverless.cli.log(`Bundling ${functionName} with Deploy...`);
          functionObject.artifact  = "./.serverless/"+functionName+".zip";

          return new Deploy(functionName);
        });

        return BbPromise.all(bundleQueue);

      })


    this.hooks = {
      //Handle `sls deploy`
      'before:package:createDeploymentArtifacts': this.zipService

    }
  }
}



module.exports = SlsBrowserify;

/*
//Handle `sls deploy`
'before:deploy:createDeploymentArtifacts': () => BbPromise.bind(this)
  .then(this.validate)
  .then(this.globalConfig)
  .then(() => {
    const functionNames = this.serverless.service.getAllFunctions();
    const bundleQueue   = functionNames.map(functionName => {
      return this.bundle(functionName);
    });

    return BbPromise.all(bundleQueue);
  })
  .catch(handleSkip),

//Handle `sls deploy function`
'before:deploy:function:packageFunction': () => BbPromise.bind(this)
  .then(this.validate)
  .then(this.globalConfig)
  .then(() => this.bundle(this.options.function))
  .catch(handleSkip),


*/
