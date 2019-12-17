'use strict';

const { validateApiKey } = require('../src/services/users');
const { insertTableColumnDefs, generateTableIfNotExist } = require('../src/services/dest-tables');

const saveTableColumnDefs = async (event, context) => {

  let clientCode = event.headers['client-code'];
  let apiKey = event.headers['x-api-key'];
  let destTableId = event.pathParameters ? event.pathParameters.destTableId : null;

  let validationResult = await validateApiKey(clientCode, apiKey);
  if (!validationResult.valid) {
    const { valid, ...noA } = validationResult;
    return noA;
  }

  if (!destTableId) {
    return {
      statusCode: 400,
      body: `destTableId is not known`
    }
  }

  let error = await insertTableColumnDefs(clientCode, tableDef.tableName, tableDef.columnDefs);

  if (error) {
    return {
      statusCode: 500,
      body: 'failed to save table def'
    };
  } else {
    return {
      statusCode: 200,
      body: `${clientCode}.${tableDef.tableName} has been created successfully`
    };
  }

};

const publishTable = async (event, context) => {

  let clientCode = event.headers['client-code'];
  let apiKey = event.headers['x-api-key'];
  let tableName = event.pathParameters ? event.pathParameters.tableName : null;

  let validationResult = await validateApiKey(clientCode, apiKey);
  if (!validationResult.valid) {
    const { valid, ...noA } = validationResult;
    return noA;
  }

  if (!tableName) {
    return {
      statusCode: 400,
      body: `tableName is not known`
    }
  }

  try {
    let tableGenerated = await generateTableIfNotExist(clientCode, tableName);
    let rtnBody = tableGenerated ? `${tableName} has been generated successfully` : `${tableName} already exists`;
    return { statusCode: 200, body: rtnBody };
  } catch (error) {
    return {
      statusCode: 500,
      body: `failed to generate table ${tableName}`
    };
  }

};

module.exports = {
  saveTableColumnDefs,
  publishTable
};