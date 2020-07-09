const moment = require("moment");

const logger = require("../lib/logger");

const logger1 = (req, res, next) => {
  logger.info(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );

  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = {
  logger: logger1
};
