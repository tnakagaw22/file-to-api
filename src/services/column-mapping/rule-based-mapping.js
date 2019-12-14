'use strict';

const { Engine } = require('json-rules-engine');

const getFact = (souroce, mappingRule) => {
    // let mappingRule = JSON.parse(mapping_value);
    let rtn = {};

    mappingRule.forEach(rule => {
        let fact = rule.conditions.any.map(condition => condition.fact);
        rtn[fact[0]] = souroce[fact];
    });

    // if (factFields.length <= 0) {
    //     throw `could not find fact from mappingRule ${mappingRule}`;
    // }

    return rtn;
};

const runRuleEngine = (source, mappingRule, destColumn) => {
    // let mappingRule = JSON.parse(mapping_value);
    let fact = getFact(source, mappingRule);

    let engine = new Engine();

    mappingRule.forEach(rule => {
        engine.addRule(rule);
    });

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
}

module.exports = {
    runRuleEngine
};