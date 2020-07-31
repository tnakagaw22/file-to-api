'use strict';

const { getColumnMappings, getDestTableName } = require("./template-column");

getColumnMappings('dev', 1)
.then(res => console.log(res))
.catch(err => console.log(err));

getDestTableName('dev', 1)
.then(res => console.log(res))
.catch(err => console.log(err));