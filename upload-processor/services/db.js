const config = require("../config");
const { getDbContext } = require("../lib/db");
const dbContext = getDbContext(config.database);

const insert = async (clientCode, tableName, newRecords) => {
  await dbContext(tableName).withSchema(clientCode).insert(newRecords);
};

const update = async (clientCode, tableName, condition, updatingRecord) => {
  await dbContext(tableName)
    .withSchema(clientCode)
    .where(condition)
    .update(updatingRecord);
};

module.exports = {
  insert,
  update,
};
