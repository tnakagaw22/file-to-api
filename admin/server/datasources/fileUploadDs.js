const fs = require("fs");
const logger = require("../lib/logger");
const path = require("path");

const saveFileToDisk = async (file, fileName) => {
  var saveTo = path.join(
    __dirname,
    `../uploaded-files/${fileName}`
  );
  logger.info(`saving to ${saveTo}`);
  var outStream = fs.createWriteStream(saveTo);
  await file.pipe(outStream);
  logger.info(`finished saving to ${saveTo}`);
};

module.exports = {
  saveFileToDisk,
};
