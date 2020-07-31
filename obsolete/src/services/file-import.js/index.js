'use strict';

const { getColumnMappings } = require("../../db/templates/template-column");
const { save } = require("../../db/dest-tables/saving");
const { mapColumns } = require('../column-mapping');

const importData = async (clientCode, tableId, sourceData) => {
    let columnMappings = await getColumnMappings(clientCode, tableId);

    let mapPromises = [];
    sourceData.forEach(source => {
        mapPromises.push(mapColumns(columnMappings, source));
    });

    // insert into destTableName
    return Promise.all(mapPromises)
        .then(mappedValues => {
            return save(clientCode, tableId, mappedValues);
        });
        // .then(res => console.log(`successfully saving ${res.length} records to ${clientCode}.${destTableName.table_name}`))
        // .catch(err => console.log(`failed to save to ${destTableName.table_name} for client ${clientCode}, ${err}`));
};

module.exports = {
    importData
};