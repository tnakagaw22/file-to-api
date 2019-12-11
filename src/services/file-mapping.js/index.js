'use strict';

const { getTemplateColumnsByTableId } = require("../../db/templates/template-column");
const { mapColumns } = require('../column-mapping/');

const mapFileToDest = async (clientCode, tableId, sourceData) => {
    let columnMappings = await getTemplateColumnsByTableId(clientCode, tableId);
    let mappedValues = [];

    sourceData.forEach(source => {
        let mappedValue = mapColumns(columnMappings, source);
        // columnMappings.forEach(columnMapping => {

        // });

        mappedValues.push(mappedValue);
    });

    return mappedValues;

};