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

  try {
    let apiKey = await signup(clientCode);

    return {
      statusCode: 200,
      body: apiKey
    };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'failed to sign up'
      };
    }

};
