'use strict';

const db = require("../");

const insertDestTableColumns = async (clientCode, tableName, columnDefs) => {
    let dup = await db(`${clientCode}.dest_tables`).where({ table_name: tableName });

    if (dup && dup.length > 0) {
        throw `${tableName} already exists for client ${clientCode}`;
    }

    return db.transaction((trx) => {
        db(`${clientCode}.dest_tables`)
            .insert({ table_name: tableName, published: true, valid: true })
            .returning('id')
            .transacting(trx)
            .then(tableIds => {

                let columnDefsToSave = columnDefs.map(columnDef => {
                    return {
                        table_id: tableIds[0],
                        column_name: columnDef['columnName'],
                        data_type: columnDef['dataType'],
                        required: columnDef['required']
                    }
                });
                return db(`${clientCode}.dest_columns`).insert(columnDefsToSave).transacting(trx);
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .then(() => `${clientCode}.dest_tables and ${clientCode}.dest_columns have been created successfully`)
        .catch(err => {
            console.log(`failed to create ${clientCode}.dest_tables and ${clientCode}.dest_columns`);
            throw err;
        });

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

const getIdentifiers = async (clientCode, tableId) => {
    return db('dest_tables').withSchema(clientCode)
        .where({
            id: tableId
        })
        .select('identifiers')
        .first();
}
module.exports = {
    insertDestTableColumns,
    // insertDestColumns,
    getPublishedTableId,
    getDestColumns,
    generateTable,
    getIdentifiers
};