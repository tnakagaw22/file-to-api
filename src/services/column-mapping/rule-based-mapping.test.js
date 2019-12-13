'use strict';

const ruleBasedMapping = require("./rule-based-mapping");

// const source = [
//     { mlsNum: 'test-123', price: 12344, listingStatus: 'A', zipCode: 11111, desc: 'this is test listing 1' },
//     { mlsNum: 'test-345', price: 777, listingStatus: 'R', zipCode: 222, desc: 'this is test listing 2' },
//     { mlsNum: 'test-678', price: 4467, listingStatus: 'S', zipCode: 44444, desc: 'this is test listing 3' }

// ];
const source = { mlsNum: 'test-123', price: 12344, listingStatus: 'A', zipCode: 11111, desc: 'this is test listing 1' };
const mapping_value = {"conditions":{"any":[{"fact":"listingStatus","operator":"equal","value":"A"}]},"event":{"type":"mappingValue","params":{"message":"Active"}}};


ruleBasedMapping.runRuleEngine(source, mapping_value, 'status')
.then(res => console.log('returned value is ' + JSON.stringify(res)))
.catch(err => console.log(err));