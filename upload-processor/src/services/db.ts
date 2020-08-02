export {};
const config = require("../config");
const { getDbContext } = require("../lib/dbContext");
const dbContext = getDbContext(config.database);

const getFirstOne = async (clientCode: string, tableName: string, condition: any) => {
  if (Object.keys(condition).length <= 0) {
    return null;
  }
  
  return await dbContext(tableName).withSchema(clientCode).where(condition).first();
};

const insert = async (clientCode: string, tableName: string, newRecords: any[]) => {
  await dbContext(tableName).withSchema(clientCode).insert(newRecords);
};

const update = async (clientCode: string, tableName: string, condition: any, updatingRecord: any) => {
  await dbContext(tableName)
    .withSchema(clientCode)
    .where(condition)
    .update(updatingRecord);
};

module.exports = {
  getFirstOne,
  insert,
  update,
};
