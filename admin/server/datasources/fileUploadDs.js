const path = require("path");
const fs = require("fs");
const Queue = require("bull");
const logger = require("../lib/logger");

const mappingQueue = new Queue("file mapping", "redis://127.0.0.1:6379");

const saveFileToDisk = async (file, fileName) => {
  let fileNameWithTimestamp = `${
    path.parse(fileName).name
  }-${new Date().getTime()}${path.parse(fileName).ext}`;

  var saveTo = path.join(
    __dirname,
    `../uploaded-files/${fileNameWithTimestamp}`
  );
  logger.info(`saving to ${saveTo}`);
  var outStream = fs.createWriteStream(saveTo);
  await file.pipe(outStream);
  logger.info(`finished saving to ${saveTo}`);
};

const addToQueue = (data) => {
  console.log("adding to queue");
  mappingQueue.add(data);
  console.log("added to queue");
};

module.exports = {
  saveFileToDisk,
  addToQueue,
};
