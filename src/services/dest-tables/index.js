'use strict';

const db = require("../../db");
const tableDef = require('../../db/dest-tables/table-def');

const insertTableColumnDefs = async (clientCode, tableName, columnDefs) => {
    try {
        await tableDef.insertDestTableColumns(clientCode, tableName, columnDefs);
    } catch (error) {
        console.log(error);
        return `failed to insert dest table ${tableName}`;
    }
};

const generateTableIfNotExist = async (clientCode, tableName) => {
    let tableExist = await db.schema.withSchema(clientCode).hasTable(tableName);

    if (tableExist) {
        console.log(`${tableName} already exists for client ${clientCode}`);
        return false;
    }

    let tableId = await tableDef.getPublishedTableId(clientCode, tableName);
    if (tableId < 1) {
        throw `table_id was not found by ${tableName} for ${clientCode}`;
    }
    let columnDefs = await tableDef.getDestColumns(clientCode, tableId);

    await tableDef.generateTable(clientCode, tableName, columnDefs);

    console.log(`${tableName} is successfully created for client ${clientCode}`);
    return true;
};

module.exports = {
    insertTableColumnDefs,
    generateTableIfNotExist
};