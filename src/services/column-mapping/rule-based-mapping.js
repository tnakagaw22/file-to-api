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

const runRuleEngine = (fact, mappingRule) => {
    // fact = {listingStatus: 'A'}

    let engine = new Engine();

    engine.addRule(mappingRule);
    engine.run(fact)
        .then(results => {
            // 'results' is an object containing successful events, and an Almanac instance containing facts
            // let result = results.events.map(event => {
            //     console.log('result is ' + event.params.message);
            //     return event.params.message;
            // });

            return 'temp result';
        })
        .catch(err => {
            console.log(err);
            throw `failed to map. fact: ${fact}, rule ${mappingRule}`;
        })
};

const mapValue = (source, mapping_value) => {
    let mappingRule = mapping_value;
    // let mappingRule = JSON.parse(mapping_value);
    let fact = getFact(source, mappingRule);

    let engine = new Engine();

    engine.addRule(mappingRule);
    return engine.run(fact)
    .then(res => res.events[0].params.message)
    .catch(err => console.log(err));
        // return engine.run(fact);


}

module.exports = {
    mapValue
};