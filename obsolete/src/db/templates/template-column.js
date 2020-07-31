'use strict';

const db = require("..");

const insertTemplateColumn = async (clientCode, templateColumn) => {

    // TODO: create unique index for template_id & dest_column_id and handle not to insert dup template column

    // let templateColumnsToSave = templateColumns.map(templateColumn => {
    //     return {
    //         template_id_id: templateId,
    //         dest_column_id: templateColumn['destColumnId'],
    //         mapping_type: templateColumn['mappingType'],
    //         mapping_value: templateColumn['mappingValue']
    //     }
    // });

    return await db(`${clientCode}.template_columns`).insert(templateColumn);
}

const updateTemplateColumn = async (clientCode, templateColumnId, templateColumnUpdateValue) => {

    return await db(`${clientCode}.template_columns`)
        .where({ id: templateColumnId })
        .update(templateColumnUpdateValue)
}

const getColumnMappings = async (clientCode, templateId) => {
    return await db('template_columns').withSchema(clientCode)
        .join('dest_columns', 'template_columns.dest_column_id', '=', 'dest_columns.id')
        .where({ template_id: templateId })
        .select('column_name', 'mapping_type', 'mapping_value');
}

const getDestTableName = async (clientCode, templateId) => {
    return await db('template_columns').withSchema(clientCode)
    .join('dest_columns', 'template_columns.dest_column_id', '=', 'dest_columns.id')
    .join('dest_tables', 'dest_columns.table_id', '=', 'dest_tables.id')
    .where({ template_id: templateId })
    .first()
    .select('table_name');
}

module.exports = {
    insertTemplateColumn,
    updateTemplateColumn,
    getColumnMappings,
    getDestTableName
};