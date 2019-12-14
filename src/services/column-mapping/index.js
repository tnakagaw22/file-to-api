'use strict';

const { runRuleEngine } = require('./rule-based-mapping');

const mapColumns = (columnMappings, source) => {
    let resultObj = {};
    let ruleMappingRes = [];

    columnMappings.forEach(mappings => {
        if (mappings.mapping_type === 'column') {
            resultObj[mappings.column_name] = source[mappings.mapping_value]
        } else {
            ruleMappingRes.push(runRuleEngine(source, mappings.mapping_value, mappings.column_name));
        }
    });

    return Promise.all(ruleMappingRes).then(function (values) {
        return Object.assign(resultObj, values[0]);
    });
};

module.exports = {
    mapColumns
};
