'use strict';

const clientTableImport = require(".");

clientTableImport.importClientTableColumns('demo3', 'test')
.then(result => {
    console.log(JSON.stringify(result));
});