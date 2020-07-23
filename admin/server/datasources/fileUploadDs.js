const path = require("path");
const fs = require("fs");
const logger = require("../lib/logger");

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

module.exports = {
  saveFileToDisk,
};
