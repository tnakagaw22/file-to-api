export {};
const fs = require("fs").promises;
const path = require("path");

const { getFirstOne, insert, update } = require("./db");
const { parseFile } = require("./fileParser");

const dirPath = path.join(__dirname, "../../uploaded-files/");

const importToDb = async (msgContent, delimiter: string) => {
  const payload: {fileName: string, mapping: any} = JSON.parse(msgContent);
  const filePath = path.join(dirPath, payload.fileName);

  const importingRecords = await parseFile(filePath, delimiter, "columnName");

  console.log(`${importingRecords.length} records to process.`);

  const newRecords = [] as any[];
  for (const importingRecord of importingRecords) {

    // create record to save
    let record = {} as any;
    for (const fieldMapping of payload.mapping.fieldMappings) {
      record[fieldMapping.destFieldName] = importingRecord[fieldMapping.value];
    }

    // create condition obj to see if same record exists
    const identifiers: string[] = payload.mapping.fieldMappings.filter(fm => fm.isIdentifier).map(fm => fm.destFieldName);
    let condition = identifiers.reduce((acc, current) => ({
      ...acc,
      [current]: record[current]
    }), {});

    let existing = await getFirstOne("kagawa", payload.mapping.destTableName, condition);
    if (existing) {
      await update("kagawa", payload.mapping.destTableName, condition, record);
    } else {
      newRecords.push(record);

      if (newRecords.length % 200 === 0 && newRecords.length > 0) {
        await insert("kagawa", payload.mapping.destTableName, newRecords);
        newRecords.length = 0
        console.log(`inserted 200 records.`)
      }
    }
  }
  
  if (newRecords.length > 0){
    await insert("kagawa", payload.mapping.destTableName, newRecords);
    console.log(`inserted ${newRecords.length} records.`)
  }
};

module.exports = {
  importToDb,
};
