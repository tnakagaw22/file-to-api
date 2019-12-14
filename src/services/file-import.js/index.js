'use strict';

const { getColumnMappings, getDestTableName } = require("../../db/templates/template-column");
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
};

module.exports = {
    importData
};