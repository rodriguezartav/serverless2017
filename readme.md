Simple & Extensible Serverless

Note the plugin in .serverless_plugins to zip functions in an easy way and monkey patch serveless bug so we can do it fast.

You must manually patch serverless
In serverless/lib/plugins/package/lib/packageService.js

var path = require("path");

packageFunction(functionName) {
  const functionObject = this.serverless.service.getFunction(functionName);
  const funcPackageConfig = functionObject.package || {};

  const exclude = this.getExcludes(funcPackageConfig.exclude);
  const include = this.getIncludes(funcPackageConfig.include);
  const zipFileName = `${functionName}.zip`;

  if( functionObject.package && functionObject.package.ignore ){
    return new BbPromise((resolve, reject) => {
      var artifactPath = path.join(this.serverless.config.servicePath, '.serverless', functionName + ".zip");
      functionObject.artifact = artifactPath;
      resolve(artifactPath);
    });
  }

  return this.zipService(exclude, include, zipFileName).then(artifactPath => {
    functionObject.artifact = artifactPath;
    return artifactPath;
  });
}

Run it with npm start instead of sls so that you use the local version

The rest is normal serverless


.ENV FILE for LocalDev
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1

For Production use serverless env vars
