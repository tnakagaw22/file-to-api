'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const apigateway = new AWS.APIGateway();

const generateApiKey = async (clientCode) => {
    // get name from event.body?
    var params = {
        description: `api for ${clientCode}`,
        name: clientCode,
        enabled: true
    };

    let apiKey = await apigateway.createApiKey(params).promise();
    console.log(`generated apiKey ${apiKey} for ${clientCode}`);

    return apiKey;
};

module.exports = {
    generateApiKey
};