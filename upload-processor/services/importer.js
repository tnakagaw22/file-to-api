const fs = require("fs").promises;
const path = require("path");

const config = require("../config");
const { getDbContext } = require("../lib/db");
const db = getDbContext(config.database);
const { parseFile } = require('./fileParser');

const dirPath = path.join(__dirname, "../uploaded-files/");

const importToDb = async (msgContent, delimiter) => {
    const payload = JSON.parse(msgContent);
    const filePath = path.join(dirPath, payload.fileName);

    const importingRecords = await parseFile(filePath, delimiter, "columnName");

    // const mappingDefinition = await db("Listings")
    //   .withSchema("kagawa")
    //   .where({ Id: 1 })
    //   .first();

    const newRecords = [];
    for (const importingRecord of importingRecords) {
      let newRecord = {};

      for (const fieldMapping of payload.mapping.fieldMappings) {
        newRecord[fieldMapping.destFieldName] = importingRecord[fieldMapping.value];
      }

      newRecords.push(newRecord);
    }

    await db("Listings").withSchema("kagawa").insert(newRecords);
};

module.exports = {
  importToDb,
};
