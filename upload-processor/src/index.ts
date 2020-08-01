const fs = require("fs").promises;
const path = require("path");
var amqp = require("amqplib/callback_api");

const logger = require("./lib/logger");
const config = require("./config");
const { importToDb } = require("./services/importer");


const CONN_URL = `amqp://${config.rabbitmq.user}:${config.rabbitmq.password}@${config.rabbitmq.host}:5672`;

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume(
      "process-uploaed-files",
      async function (msg) {

        try {
          const processStart = new Date();

          await importToDb(msg.content, ',');

          const processEnd = new Date();
          const secondsElapsed = (processEnd.getTime() - processStart.getTime()) / 1000;

          console.info(`Execution time: ${secondsElapsed} seconds`);

        } catch (error) {
          console.log(`error ${error}`);
        }

      },
      { noAck: true }
    );
  });
});
