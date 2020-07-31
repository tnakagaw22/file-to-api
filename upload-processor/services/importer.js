const fs = require("fs").promises;
const path = require("path");

const { getFirstOne, insert, update } = require("./db");
const { parseFile } = require("./fileParser");

const dirPath = path.join(__dirname, "../uploaded-files/");

const importToDb = async (msgContent, delimiter) => {
  const payload = JSON.parse(msgContent);
  const filePath = path.join(dirPath, payload.fileName);

  const importingRecords = await parseFile(filePath, delimiter, "columnName");

  const newRecords = [];
  for (const importingRecord of importingRecords) {

    // create record to save
    let record = {};
    for (const fieldMapping of payload.mapping.fieldMappings) {
      record[fieldMapping.destFieldName] = importingRecord[fieldMapping.value];
    }

    // create condition obj to see if same record exists
    const identifiers = payload.mapping.fieldMappings.filter(fm => fm.isIdentifier).map(fm => fm.destFieldName);
    let condition = identifiers.reduce((acc, current) => ({
      ...acc,
      [current]: record[current]
    }), {});

    let existing = await getFirstOne("kagawa", payload.mapping.destTableName, condition);
    if (existing) {
      await update("kagawa", payload.mapping.destTableName, condition, record);
    } else {
      newRecords.push(record);
    }
  }

  if (newRecords.length > 0) {
    await insert("kagawa", payload.mapping.destTableName, newRecords);
  }
};

module.exports = {
  importToDb,
};
