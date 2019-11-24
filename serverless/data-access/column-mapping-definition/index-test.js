  
'use strict';

const create = require('./create.js');
const read = require('./read-one.js');

read('', (error, data) => {
    if (error){
        console.log(error);
    } else {
        console.log(JSON.stringify(data));
    }
        

})