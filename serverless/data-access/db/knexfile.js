const config = require('../../config');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      // port: process.env.DATABASE_PORT,
      port: config.port,
      host: config.host,
      database: config.database,
      user: config.user,
      password: config.password,
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/development'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
