'use strict';

const db = require("../");

const insertTemplateColumns = async (clientCode, templateId, templateColumns) => {

    // TODO: create unique index for template_id & dest_column_id and handle not to insert dup template column

    let templateColumnsToSave = templateColumns.map(templateColumn => {
        return { 
            template_id_id: templateId, 
            dest_column_id: templateColumn['destColumnId'], 
            mapping_type: templateColumn['mappingType'], 
            mapping_value: templateColumn['mappingValue']
        }
    });

    return await db(`${clientCode}.template_columns`).insert(templateColumnsToSave);
}

module.exports = {
    insertTemplateColumns
};