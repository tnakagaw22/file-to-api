const path = require("path");
const { parseFile } = require("./fileParser");

describe("fileParser.parseFile", () => {
  test("csv by columnName", async () => {
    const filePath = path.join(__dirname, 'mockCsvRecords.csv');

    const result = await parseFile(filePath, ',', 'columnName');

    expect(result.length).toEqual(2);
  });

 
});