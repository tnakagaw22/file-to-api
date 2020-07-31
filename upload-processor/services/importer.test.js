jest.mock("./fileParser");
jest.mock("./db");

const { parseFile } = require("./fileParser");
const { insert, update } = require("./db");
const { importToDb } = require("./importer");

const msgContent = require("./mockMsgContent.json");
const { parsedRecords } = require("./mockParsedRecords");

describe("importer.importToDb", () => {
  jest.mock("./fileParser", () => ({
    parseFile: jest.fn(),
  }));

  jest.mock("./db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
  }));

  test("importTest", async () => {
    parseFile.mockImplementation(async () => parsedRecords);

    await importToDb(msgContent, ",");

    expect(insert.mock.calls.length).toBe(1);
  });
});
