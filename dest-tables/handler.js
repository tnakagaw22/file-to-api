'use strict';

const { validateApiKey } = require('../src/services/users');
const { insertTableColumnDefs } = require('../src/services/dest-tables')

module.exports.saveTableColumnDefs = async (event, context) => {

  let clientCode = event.headers['client-code'];
  let apiKey = event.headers['x-api-key'];
  let tableDef = JSON.parse(event.body);

  let validationResult = await validateApiKey(clientCode, apiKey);
  if (!validationResult.valid) {
    const { valid, ...noA } = validationResult;
    return noA;
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
