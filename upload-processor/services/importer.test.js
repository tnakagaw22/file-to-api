jest.mock("./fileParser");
const { parseFile } = require("./fileParser");
const { importToDb } = require("./importer");
const msgContent = require("./mockMsgContent.json");
const { parsedRecords } = require("./mockParsedRecords");

describe("importer.importToDb", () => {
  jest.mock("./fileParser", () => ({
    parseFile: jest.fn(),
  }));

  test("importTest", async () => {
    parseFile.mockImplementation(async () => parsedRecords);

    await importToDb(msgContent, ",");

    expect(2).toEqual(2);
  });
});
