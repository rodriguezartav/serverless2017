// Update with your config settings.
//require('dotenv').config()


module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: "localhost",
      database: "booking",
      user:     "",
      password: ""
    },
  },



  staging: {
    client: 'postgresql',
    connection: {
      host: "",
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
  },

  production: {
    debug: true,
    client: 'postgresql',
    connection: {
      host: "booking.crn5tfrxosyw.us-east-1.rds.amazonaws.com",
      database: 'booking',
      user:     'roberto',
      password: 'Monomono1'
    },
    acquireConnectionTimeout: 1000,
    pool: {
      min: 0,
      max: 10,
      afterCreate: function (conn, done) {
        console.log("Connection Created");
        done(null,conn);
      }

    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
