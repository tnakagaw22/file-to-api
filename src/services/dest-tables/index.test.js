'use strict';

const destTable = require(".");

destTable.generateTableIfNotExist('dev', 'test')
.then((res) => {
    console.log('index-test ran successfully');
})
.catch((err) => {
    console.log(err);
})