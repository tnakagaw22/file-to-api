'use strict';

const destTable = require("./");

destTable.generateTableIfNotExist('demo1', 'test')
.then((res) => {
    console.log('index-test ran successfully');
})
.catch((err) => {
    console.log(err);
})