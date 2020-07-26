const fs = require("fs").promises;
const path = require("path");
var amqp = require("amqplib/callback_api");

const logger = require("./lib/logger");
const config = require("./config");
const { importToDb } = require("./services/importer");


const CONN_URL = `amqp://${config.rabbitmq.user}:${config.rabbitmq.password}@${config.rabbitmq.host}:5672`;

console.log(__dirname);
const dirPath = path.join(__dirname, "/uploaded-files/");
const filePath = path.join(dirPath, "docker rabbit-1594416971186.txt");

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume(
      "process-uploaed-files",
      async function (msg) {

        await importToDb(msg.content.toString(), ',');

      },
      { noAck: true }
    );
  });
});
