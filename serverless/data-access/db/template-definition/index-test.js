'use strict';

const templateDefinition = require("./");

let fieldDefinitions = [{
    'fieldName': 'mls_number',
    'dataType': 'string',
    'length': 50,
    'isRequired': 'true',
},
// {
//     'templateName': 'listings2',
//     'fieldName': 'price',
//     'dataType': 'integer',
//     'isRequired': 'false'
// }, 
{
    'fieldName': 'price',
    'dataType': 'decimal',
    'precision': 18,
    'scale': 2
}];
templateDefinition.createTemplateDefinition('demo', 'listings',fieldDefinitions);

// userSignup.generateApiKey(schema);