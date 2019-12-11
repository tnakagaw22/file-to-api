'use strict';
const { Engine } = require('json-rules-engine');

const { mapColumns } = require('../column-mapping/');

const mapColumns = async (columnMappings, source) => {
    let resultObj = {};

    columnMappings.forEach(mappings => {
        if (mappings.mapping_type === 'column') {
            resultObj[mappings.column_name] = source[mappings.mapping_value]
        } else {

        }
    });

    return resultObj;
};

const mapRuleBasedColumn = async (souroce, mapping_value) => {
    let mappingRule = JSON.parse(mapping_value);
    let factFields = mappingRule.conditions.any.map(condition => condition.fact)
    let facts = factFields.map(factField => {
        // console.log(sourceFileData[0][factField]);
        let rtn = {};
        rtn[factField] = souroce[factField];
        return rtn;
    });
};