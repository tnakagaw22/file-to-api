'use strict';

const config = require('../../../config');
const db = require("../");
const AWS = require('aws-sdk');
AWS.config.update({region: config.awsRegion});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const createTemplateDefinition = (clientCode, templateName, fieldDefinitions) => {
    var params = {
        TableName: 'template_definitions',
        Item: {
          'client_templateName' : `${clientCode}-${templateName}`,
          'field_definitions': fieldDefinitions
        }
      };

      dynamoDb.put(params, (error, data) => {
        if (error) {
          console.log(error);
        //   callback(error);
        }
        db.schema.createTable(`${clientCode}.${templateName}`, (table) => {
            table.increments('id')
            
            for (let i = 0; i < fieldDefinitions.length; i++) {
                let fieldDefinition = fieldDefinitions[i];
                let fieldName = fieldDefinition['fieldName'];
        
                if (fieldDefinition['dataType'] === 'string') {
                    table.string(fieldName, fieldDefinition['length'])
                } else if (fieldDefinition['dataType'] === 'integer') {
                    table.integer(fieldName)
                } else if (fieldDefinition['dataType'] === 'decimal') {
                    table.decimal(fieldName, fieldDefinition['precision'], fieldDefinition['scale']);
                }
            }
          })
          .then(()=> console.log(`${templateName} table is created for ${clientCode}`))
          .catch((e) => console.log(e));
      });
}

module.exports = {
    createTemplateDefinition
};