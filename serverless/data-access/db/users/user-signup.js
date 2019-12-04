'use strict';

const db = require("../");
const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

const apigateway  = new AWS.APIGateway();

const createSchema = async (clientCode) => {
    const schemaName = clientCode.trim().replace(' ', '_');

    // await db.raw(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
    await db.raw(`CREATE SCHEMA ${schemaName}`);

    return schemaName;
};

const generateApiKey = async (clientCode) => {
        // get name from event.body?
        var params = {
            description: `api for ${clientCode}`,
            name: clientCode,
            enabled: true
          };
    
    apigateway.createApiKey(params).promise()
        .then((res) =>{
            return saveApiKey(res['value'], clientCode)
        })
        .then(() => console.log(`api key is successfully created for ${clientCode}`))
        .catch((e) => console.log(`failed to create api key for ${clientCode}, ${e}`));
};

const saveApiKey = (apiKey, clientCode) => {
    return db('api_keys')
            .insert({
                api_key: apiKey,
                client_code: clientCode
            });
};

module.exports = {
    createSchema,
    generateApiKey
};