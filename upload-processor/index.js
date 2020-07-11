const Queue = require("bull");
const fs = require('fs')
const path = require('path');

const { getDbContext } = require("./lib/db");
const logger = require("./lib/logger");

console.log(process.env.NODE_ENV);

console.log(__dirname)
const dirPath = path.join(__dirname, '/uploaded-files/');
const filePath = path.join(dirPath, 'docker rabbit-1594416971186.txt');


fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('reading data')
  console.log(data.toString())
})

const mappingQueue = new Queue("file mapping", "redis://127.0.0.1:6379");
const db = getDbContext({
  client: "mssql",
  connection: {
    server: "localhost",
    user: "sa",
    password: "P@22word",
    database: "Mappit",
    port: 1433,
  },
});

// const db = getDbContext({
//   client: 'pg',
//   connection: {
//     port: 5432,
//     host: 'localhost',
//     database: 'file-to-api',
//     user: 'postgres',
//     password: 'postgres',
//   }
// });

mappingQueue.process(async (job, done) => {
  logger.info("start processing" + JSON.stringify(job.data));

  try {
    await db("Listings")
      .withSchema("kagawa")
      .insert({ ListingKey: "test-123", Status: "active", Address: "111 8th" });
  } catch (error) {
    logger.error(error);
  }

  logger.info(`successfully inserted`);

  // job.data contains the custom data passed when the job was created
  // job.id contains id of this job.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // transcode video asynchronously and report progress
  job.progress(42);

  // call done when finished
  done(null, "fdf");

  // // or give a error if error
  // done(new Error('error transcoding'));

  // // or pass it a result
  // done(null, { framerate: 29.5 /* etc... */ });

  // // If the job throws an unhandled exception it is also handled correctly
  // throw new Error('some unexpected error');
});

//   mappingQueue.on('completed', (job, result) => {
//     console.log(`Job completed with result ${result}`);
//   })
