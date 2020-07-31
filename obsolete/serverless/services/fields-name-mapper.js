'use strict';

const read = require('../data-access/column-mapping-definition/read-one');

const params = {
    TableName: 'ColumnMappingDefinition',
    Key: {
      // id: event.pathParameters.id
      'Client-Template-Column': 'Tae-Listing-Status'
    }
  };

read(params, (error, data) => {
    if (error){
        console.log(error);
    } else {
        console.log(JSON.stringify(data));
    }
        

})

module.exports = (source) => {
    let mappedValue;
    let columnNameMappingDef = get-columnName-mapping-def(clientCode, template);
    const entries = Object.entries(columnNameMappingDef);
    for (const [res, src] of entries) {
      mappedValue[res] = source[src]
    }
    
    return mappedValue;
};