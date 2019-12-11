'use strict';

const ruleBasedMapping = require("./rule-based-mapping");

const source = { mlsNum: 'test-123', price: 12344, listingStatus: 'A', zipCode: 11111, desc: 'this is test listing 1' };
const mapping_value = {"conditions":{"any":[{"fact":"listingStatus","operator":"equal","value":"A"}]},"event":{"type":"mappingValue","params":{"message":"Active"}}};


ruleBasedMapping.mapValue(source, mapping_value)
.then(res => console.log('returned value is ' + JSON.stringify(res)))
.catch(err => console.log(err));