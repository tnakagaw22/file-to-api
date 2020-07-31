'use strict';

const { save } = require("./saving");

let savingData = [ { mls_number: 'test-123', price: 6, status: 'Active' },
{ mls_number: 'test-345', price: 8, status: '' },
{ mls_number: 'test-678', price: 4, status: '' },
{ mls_number: 'test-999', price: 994, status: '' } 

];

let clientCode = 'dev';
let tableId = 1;

save(clientCode, tableId, savingData)
.then((res) => console.log(res))
.catch((err) => console.log(err))