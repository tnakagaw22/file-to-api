'use strict';

const db = require("../db");
const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

const apigateway  = new AWS.APIGateway();

module.exports.signup = async (event, context) => {

    // get name from event.body?
    var params = {
        description: 'api for demo2',
        name: 'demo2',
        enabled: true
      };

    let result = await apigateway.createApiKey(params).promise();

    console.log(result);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };

};
