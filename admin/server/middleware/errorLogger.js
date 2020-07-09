const logger = require("../lib/logger");

const errorLogger = (error, req, res, next) => {
  // Any request to this server will get here, and will send an HTTP
  // response with the error message 'woops'
  logger.error(error.message);
  res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message || "Internal Server Error",
  });
};

module.exports = {
  errorLogger
};
