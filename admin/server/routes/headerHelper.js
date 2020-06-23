const getClient = (req) => {
  return req.headers["clientCode"] || "dev";
};

module.exports = {
  getClient,
};
