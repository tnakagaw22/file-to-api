'use strict';

const { mapColumns } = require("./");

const sources = [
    { mlsNum: 'test-123', price: 12344, listingStatus: 'A', zipCode: 11111, desc: 'this is test listing 1' },
    { mlsNum: 'test-345', price: 777, listingStatus: 'R', zipCode: 222, desc: 'this is test listing 2' },
    { mlsNum: 'test-678', price: 4467, listingStatus: 'S', zipCode: 44444, desc: 'this is test listing 3' }

];

const mapping_value = [
    { "conditions": { "any": [{ "fact": "listingStatus", "operator": "equal", "value": "A" }] }, "event": { "type": "mappingValue", "params": { "message": "Active" } } },
    { "conditions": { "any": [{ "fact": "listingStatus", "operator": "equal", "value": "R" }] }, "event": { "type": "mappingValue", "params": { "message": "Rented" } } }
];

const columnMappings = [
    { column_name: 'mls_number', mapping_type: 'column', mapping_value: 'mlsNum' },
    { column_name: 'price', mapping_type: 'column', mapping_value: 'price' },
    { column_name: 'status', mapping_type: 'rule', mapping_value: mapping_value }
]

let res = [];

sources.forEach(source => {
    res.push(mapColumns(columnMappings, source))
});

Promise.all(res)
    .then((result) => console.log(result))
    .catch(err => console.log(err));

// ruleBasedMapping.runRuleEngine(source, mapping_value)
// .then(res => console.log('returned value is ' + JSON.stringify(res)))
// .catch(err => console.log(err));