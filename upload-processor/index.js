const fs = require("fs").promises;
const path = require("path");
var amqp = require("amqplib/callback_api");

const logger = require("./lib/logger");
const config = require("./config");
const { getDbContext } = require("./lib/db");

const db = getDbContext(config.database);

const CONN_URL = `amqp://${config.rabbitmq.user}:${config.rabbitmq.password}@${config.rabbitmq.host}:5672`;

console.log(__dirname);
const dirPath = path.join(__dirname, "/uploaded-files/");
const filePath = path.join(dirPath, "docker rabbit-1594416971186.txt");

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume(
      "process-uploaed-files",
      async function (msg) {

        const payload = JSON.parse(msg.content.toString());
        const filePath = path.join(dirPath, payload.fileName);
        const data = await fs.readFile(filePath);
        const delimiter = ',';

        const lines  = data.toString().split("\n");
        const dataLines = lines.slice(1);
        const headers = lines[0].split(delimiter);

        for (const line of dataLines) {
          const values = line.split(delimiter);
          for (let index = 0; index < values.length; index++) {
            const value = values[index];
            console.log(`field ${headers[index]} val ${value}`);
            
          }
        }
        const mappingDefinition = await db("Listings")
          .withSchema("kagawa")
          .where({ Id: 1 })
          .first();

        // console.log(`got md ${mappingDefinition.ListingKey} ${new Date()}`)
        console.log("Message:", msg.content.toString());
        // console.log('.....');
        // setTimeout(function(){

        //   console.log("Message:", msg.content.toString());
        // },4000);
      },
      { noAck: true }
    );
  });
});
