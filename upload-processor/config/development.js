module.exports = {
  rabbitmq: {
    host: "messaging",
    user: "rabbit",
    password: "rabbit",
  },
  database: {
    client: "mssql",
    connection: {
      server: "host.docker.internal",
      user: "mappit-user",
      password: "mappit-user",
      database: "Mappit",
      options: {
        port: 1433,
      },
    },
  },
};
