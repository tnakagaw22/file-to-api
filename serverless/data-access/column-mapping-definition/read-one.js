'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
    const params = {
      TableName: 'ColumnMappingDefinition',
      Key: {
        // id: event.pathParameters.id
        'Client-Template-Column': 'Tae-Listing-Mls'
      }
    };
  
    return dynamoDb.get(params, (error, data) => {
      if (error) {
        callback(error);
      }
      callback(error, data.Item);
    });
  };