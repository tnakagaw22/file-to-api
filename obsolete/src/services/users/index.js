'use strict';

const userApiKey = require('../../db/users/user-api-key');
const { generateApiKey } = require('../../aws/api-gateway');
const { createDestTable, createDestColumn } = require("../../db/dest-tables/setup");
const { createTemplateDef, createTemplateColumn } = require("../../db/templates/setup");

const signup = async (clientName) => {
  try {

    let clientCode = await userApiKey.createSchema(clientName);
    console.log(`schema ${clientCode} is created`);

    let apiKey = await generateApiKey(clientCode);

    let promises = [];
    promises.push(userApiKey.saveApiKey(apiKey, clientCode));
    promises.push(createDestTable(clientCode));
    promises.push(createDestColumn(clientCode));
    promises.push(createTemplateDef(clientCode));
    promises.push(createTemplateColumn(clientCode));

    Promise.all(promises)
      .then(() => console.log(`client ${clientName} signup completed.`))
      .catch((err) => {
        console.log(`table creations failed for client ${clientName}`);
        throw err;
      });

    return apiKey;

  } catch (error) {
    console.log(`failed to create client ${clientName}: ${error}`);
    throw (error);
  }
}

const validateApiKey = async (clientCode, apiKey) => {
  if (!clientCode) {
    return {
      valid: false,
      statusCode: 400,
      body: 'clientCode is missing'
    }
  }

  if (!apiKey) {
    return {
      valid: false,
      statusCode: 400,
      body: 'API Key does not exist in request header'
    }
  }

  let clientCodeInDb = await userApiKey.getClientCodeByApiKey(apiKey);

  if (!clientCodeInDb || clientCode !== clientCodeInDb.client_code) {
    return {
      valid: false,
      statusCode: 401,
      body: 'API Key is not valid;'
    }
  }

  return {
    valid: true
  };
}

module.exports = {
  signup,
  validateApiKey
};