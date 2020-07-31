'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
    // const data = JSON.parse(event.body);
    
    let mappingValue = [
        {
            conditions: {
                any: [{
                    fact: 'listingStatus',
                    operator: 'equal',
                    value: "A"
                }]
              },
              event: {
                type: 'listingStatus',
                params: {
                  message: 'Active'
                }
              }
        }
    ]
    const params = {
      TableName: 'ColumnMappingDefinition',
      Item: {
          'Client-Template-Column': 'Tae-Listing-Status',
          'MappingType': 'Rule',
          'MappingValue': mappingValue,
      }
    };
  
    return dynamoDb.put(params, (error, data) => {
      if (error) {
        callback(error);
      }
      callback(error, params.Item);
    });
  };