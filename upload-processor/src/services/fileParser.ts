export {};
const fs = require("fs").promises;

const parseFile = async (filePath, delimiter, parseBy) => {

    const textData = await fs.readFile(filePath);

    let records: any[] = [];
    if (parseBy === "columnName") {
        records = parseByColumnName(textData, delimiter);
    } else if (parseBy === "columnIndex") {
        records = parseByColumnIndex(textData, delimiter);
    } else {
        throw new Error(`Unexpected parseBy ${parseBy}`);
    }

    return records;
}

const parseByColumnName = (textData, delimiter) => {
    const lines  = textData.toString().split("\n");
    const dataLines = lines.slice(1);
    const headers = lines[0].split(delimiter);

    const importingRecords: any[] = [];

    for (const line of dataLines) {
      const values = line.split(delimiter);
      let record = {};

      for (let index = 0; index < values.length; index++) {
        record[headers[index].trim()] = values[index].trim();
      }
      
      importingRecords.push(record);
    }

    return importingRecords;
}

const parseByColumnIndex = (textData, delimiter) => {
return [{}];
}


module.exports = {
    parseFile,
  };
  