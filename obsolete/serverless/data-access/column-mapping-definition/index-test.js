  
'use strict';

const create = require('./create.js');
const read = require('./read-one.js');

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