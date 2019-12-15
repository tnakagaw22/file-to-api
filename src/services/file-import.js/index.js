'use strict';

const { getColumnMappings, getDestTableName } = require("../../db/templates/template-column");
const { bulkInsert } = require("../../db/dest-tables/saving");
const { mapColumns } = require('../column-mapping');

const importData = async (clientCode, tableId, sourceData) => {
    let columnMappings = await getColumnMappings(clientCode, tableId);
    let destTableName = await getDestTableName(clientCode, tableId);

    let mapPromises = [];
    sourceData.forEach(source => {
        mapPromises.push(mapColumns(columnMappings, source));
    });

    // insert into destTableName
    return Promise.all(mapPromises)
        .then(mappedValues => {
            return bulkInsert(clientCode, destTableName.table_name, mappedValues);
        })
        .catch(err => console.log(err));
};

module.exports = {
    importData
};