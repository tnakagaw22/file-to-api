const amqp = require('amqplib/callback_api');

const config = require('../config');

const CONN_URL = `amqp://${config.rabbitmq.user}:${config.rabbitmq.password}@${config.rabbitmq.host}:5672`;

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
   });
});

const publishToQueue = async (queueName, data) => {
   ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
}

module.exports = {
    publishToQueue
}

process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});