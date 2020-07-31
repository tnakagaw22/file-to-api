const knex = require('knex');
const config = require('../../config');

const knexConfig = {
    client: config.clientDatabase.databaseType,
    connection: {
      port: config.clientDatabase.port,
      host: config.clientDatabase.host,
      database: config.clientDatabase.database,
      user: config.clientDatabase.user,
      password: config.clientDatabase.password,
    },
    useNullAsDefault: true
  };

  module.exports = knex(knexConfig);