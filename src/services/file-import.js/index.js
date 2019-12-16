'use strict';

const { getColumnMappings, getDestTableName } = require("../../db/templates/template-column");
const { getIdentifiers } = require('./table-def')
const { bulkInsert } = require("../../db/dest-tables/saving");
const { mapColumns } = require('../column-mapping');

const importData = async (clientCode, tableId, sourceData) => {
    let columnMappings = await getColumnMappings(clientCode, tableId);

    let mapPromises = [];
    sourceData.forEach(source => {
        mapPromises.push(mapColumns(columnMappings, source));
    });
    let identifiers = await getIdentifiers(clientCode, tableId);
    // identifiers.identifiers
    let destTableName = await getDestTableName(clientCode, tableId);
    // destTableName.table_name

    // insert into destTableName
    return Promise.all(mapPromises)
        .then(mappedValues => {
    console.log(mappedValues)
    // return bulkInsert(clientCode, tableId, mappedValues);
        })
        .catch(err => console.log(err));
};

module.exports = {
    importData
};