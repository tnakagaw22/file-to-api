'use strict';

const tableDef = require("./table-def");

tableDef.insertDestTable('demo1', 'test')
.then(result => console.log(result))
.catch(err  => console.log(err));

tableDef.insertDestColumns('demo1', 2,
 [
    {
        columnName: 'test1',
        dataType: 'string',
        required: true
    },    {
        columnName: 'test2',
        dataType: 'int',
        required: false
    },    {
        columnName: 'test3',
        dataType: 'integer',
        required: false
    },
])
.then(result => console.log(result))
.catch(err  => console.log(err));

// tableDef.getPublishedTableId('demo1', 'listings').then(result => console.log(result));
// tableDef.getPublishedTableId('demo1', 'notExistingTableName').then(result => console.log(result));

// // fail--------------------
// // tableDef.getPublishedTableId('nonExistingClient', 'notExistingTableName').then(result => console.log(result));

// tableDef.getDestColumns('demo1', 1).then(res => {
//     tableDef.generateTable('demo1', 'listings', res);

// });
// tableDef.getDestColumns('demo1', 2);

