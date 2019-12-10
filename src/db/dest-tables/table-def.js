'use strict';

const db = require("../");

const insertDestTable = async (clientCode, tableName) => {
    let dup = await db(`${clientCode}.dest_tables`).where({table_name: tableName});

    if (dup && dup.length> 0) {
        throw `${tableName} already exists for client ${clientCode}`;
    }

    return await db(`${clientCode}.dest_tables`).insert(
        { table_name: tableName, published: true, valid: true}
      ).returning('id');
}

const insertDestColumns = async (clientCode, tableId, columnDefs) => {
    let columnDefsToSave = columnDefs.map(columnDef => {
        return { 
            table_id: tableId, 
            column_name: columnDef['columnName'], 
            data_type: columnDef['dataType'], 
            required: columnDef['required']
        }
    });

    return await db(`${clientCode}.dest_columns`).insert(columnDefsToSave);
}

const getPublishedTableId = async (clientCode, tableName) => {

    let dest_table = await db(`${clientCode}.dest_tables`)
        .where({
            table_name: tableName,
            published: true,
            valid: true
        });
    if (!dest_table) {
        console.log(`returned dest_table was not valid for clientCode ${clientCode}, tableName ${tableName}`);
        return 0;
    }

    if (dest_table.length < 1) {
        console.log(`${tableName} table was not found for clientCode ${clientCode}.`);
        return 0;
    }

    if (dest_table.length > 1) {
        console.log(`multiple records found for ${tableName} for clientCode ${clientCode}`);
        return 0;
    }

    return dest_table[0].id;
};

const getDestColumns = async (clientCode, tableId) => {
    let dest_columns = await db(`${clientCode}.dest_columns`)
        .where({
            table_id: tableId
        });

    return dest_columns;
}

const generateTable = async (clientCode, tableName, columnDefs) => {
    await db.schema.withSchema(clientCode)
        .createTable(tableName, (table) => {

            table.increments('id')

            for (let i = 0; i < columnDefs.length; i++) {
                let columnDef = columnDefs[i];
                let fieldName = columnDef['column_name'];

                if (columnDef['data_type'] === 'string') {
                    table.string(fieldName, columnDef['length'])
                } else if (columnDef['data_type'] === 'integer') {
                    table.integer(fieldName)
                } else if (columnDef['data_type'] === 'decimal') {
                    // table.decimal(fieldName, fieldDefinition['precision'], fieldDefinition['scale']);
                    table.decimal(fieldName);
                }
            }
        });

}
module.exports = {
    insertDestTable,
    insertDestColumns,
    getPublishedTableId,
    getDestColumns,
    generateTable
};