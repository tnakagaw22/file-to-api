const fs = require('fs')
const path = require('path');
var amqp = require('amqplib/callback_api');

const config = require('./config');

const { getDbContext } = require("./lib/db");
const logger = require("./lib/logger");


const CONN_URL = `amqp://${config.rabbitmq.user}:${config.rabbitmq.password}@${config.rabbitmq.host}:5672`;

console.log(__dirname)
const dirPath = path.join(__dirname, '/uploaded-files/');
const filePath = path.join(dirPath, 'docker rabbit-1594416971186.txt');

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume('process-uploaed-files', function (msg) {
      console.log('.....');
      setTimeout(function(){
        console.log("Message:", msg.content.toString());
      },4000);
      },{ noAck: true }
    );
  });
});

