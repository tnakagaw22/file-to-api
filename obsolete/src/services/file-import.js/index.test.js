'use strict';

const sources = [
    { mlsNum: 'test-123', price: 12344, listingStatus: 'A', zipCode: 11111, desc: 'this is test listing 1' },
    { mlsNum: 'test-345', price: 777, listingStatus: 'R', zipCode: 222, desc: 'this is test listing 2' },
    { mlsNum: 'test-678', price: 4467, listingStatus: 'S', zipCode: 44444, desc: 'this is test listing 3' }
];

const { importData } = require('./');

let tableId = 1;
importData('dev', tableId, sources)
    .then((mappedData) => {
        console.log(mappedData)
    })
    .catch(err => console.log(err));