var Knex = {}
var knexfile = require("./knexfile");
var key = process.env["NODE_ENV"] || "development";
var knex = require('knex')(knexfile[key]);

Knex.getInstance = function(){
  return knex;
}

Knex.destroy = function(){
  return;
}

Knex.batchUpdate = function(table,records,updateFields){
  var sqls = [];
  records.forEach( function(record){
    var sql = knex.table(table).insert(record).toString();
    var addOn = [ ' ON CONFLICT (id) DO UPDATE SET'];
    updateFields.forEach( function(fieldName){
      var parts = [fieldName, "=", "EXCLUDED", ".", fieldName];
      if( addOn.length != 1 ) addOn.push(",");
      addOn.push( parts.join("") );
    })
    addOn.push('returning *;');
    sqls.push( sql + addOn.join(" ") );
  });
  return knex.raw( sqls.join(" ") )
}


module.exports = Knex;
