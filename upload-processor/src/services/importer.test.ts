export {};
jest.mock("./fileParser");
jest.mock("./db");

const { parseFile } = require("./fileParser");
const { getFirstOne, insert, update } = require("./db");
const { importToDb } = require("./importer");

const { msgContent } = require("./mockMsgContent");
const { parsedRecords } = require("./mockParsedRecords");

afterEach(() => {
  jest.clearAllMocks();
});

describe("importer.importToDb", () => {
  // jest.mock("./fileParser", () => ({
  //   parseFile: jest.fn(),
  // }));

  // jest.mock("./db", () => ({
  //   getFirstOne: jest.fn(),
  //   insert: jest.fn(),
  //   update: jest.fn(),
  // }));

  test("when record does not exist, insert", async () => {
    parseFile.mockImplementation(async () => parsedRecords);
    getFirstOne.mockImplementation(async () => null)

    await importToDb(msgContent, ",");

    expect(insert.mock.calls.length).toBe(1);
  });

  test("when record exists, update", async () => {
    parseFile.mockImplementation(async () => parsedRecords);
    getFirstOne.mockImplementation(async () => new Object())

    await importToDb(msgContent, ",");
 
    expect(insert.mock.calls.length).toBe(0);
    expect(update.mock.calls.length).toBe(2);
  });
});
