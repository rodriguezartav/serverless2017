var Plates = require("plates");
var fs = require("fs");


function ParseEmail(emailName, data){
  var html = fs.readFileSync("../emails/"+emailName+".html");
  var output = Plates.bind(html, data);
  return output;

}

module.exports = ParseEmail;
