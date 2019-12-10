'use strict';

const user = require("./");

// \data-access\db\users> jest index.test.js
jest.mock("./api-gateway", () => ({
    generateApiKey: jest
      .fn()
      .mockReturnValueOnce("this-is-test-api-key-jfiea3gfj")

  }));

describe("Signup", () => {
    test("Create schema and save api_key", async () => {
        await user.signup('demo2');
      });
});