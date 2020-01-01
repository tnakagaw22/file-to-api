'use strict';

const tableDef = require("./table-def");

// tableDef.insertDestTable('dev', 'test')
// .then(result => console.log(result))
// .catch(err  => console.log(err));

// tableDef.insertDestColumns('dev', 2,
//  [
//     {
//         columnName: 'test1',
//         dataType: 'string',
//         required: true
//     },    {
//         columnName: 'test2',
//         dataType: 'int',
//         required: false
//     },    {
//         columnName: 'test3',
//         dataType: 'integer',
//         required: false
//     },
// ])
// .then(result => console.log(result))
// .catch(err  => console.log(err));
tableDef.insertDestTableColumns('dev', 'test',  [
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
    .then(result => console.log('result:---------- '+ JSON.stringify(result)))
    .catch(err => console.log('err:---------- '+ err))
// tableDef.getPublishedTableId('dev', 'listings').then(result => console.log(result));
// tableDef.getPublishedTableId('dev', 'notExistingTableName').then(result => console.log(result));

// // fail--------------------
// // tableDef.getPublishedTableId('nonExistingClient', 'notExistingTableName').then(result => console.log(result));

// tableDef.getDestColumns('dev', 1)
// .then(res => {
//     tableDef.generateTable('dev', 'listings', res);
// })
// .catch(err  => console.log(err));

// tableDef.getDestColumns('dev', 2);
