'use strict';

const { signup } = require('../src/services/users');


module.exports.signup = async (event, context) => {

  let clientCode = event.pathParameters.clientCode;
  if (!clientCode) {
    return {
      statusCode: 400,
      body: 'clientCode is missing'
    }
  }

  await signup(clientCode);

  return {
    statusCode: 200,
    body: `client ${clientCode} has been created successfully`
  };

};
