'use strict';

const { Engine } = require('json-rules-engine');

const getFact = (souroce, mappingRule) => {
    // let mappingRule = JSON.parse(mapping_value);
    let factFields = mappingRule.conditions.any.map(condition => condition.fact);

    if (!factFields) {
        throw `could not find fact from mappingRule ${mappingRule}`;
    }

    let rtn = {};
    rtn[factFields[0]] = souroce[factFields];

    return rtn;
};

const runRuleEngine = (source, mapping_value, destColumn) => {
    let mappingRule = mapping_value;
    // let mappingRule = JSON.parse(mapping_value);
    let fact = getFact(source, mappingRule);

    let engine = new Engine();

    engine.addRule(mappingRule);
    // engine.addRule({ "conditions": { "any": [{ "fact": "listingStatus", "operator": "equal", "value": "R" }] }, "event": { "type": "mappingValue", "params": { "message": "Rented" } } });

    return engine.run(fact)
        .then(res => {
            let mappedValue = '';
            if (res.events[0]) {
                mappedValue = res.events[0].params.message;
            }

            let rtn = {};
            rtn[destColumn] = mappedValue;
            return rtn;

        })
        .catch(err => console.log(err));
    // return engine.run(fact);


}

module.exports = {
    runRuleEngine
};