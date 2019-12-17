'use strict';

const { updateTemplateDef, insertTemplateDef } = require('../../db/templates/template-def');
const { updateTemplateColumn, insertTemplateColumn } = require('../../db/templates/template-column');

const saveTemplateDef = async (clientCode, templateId, templateDef) => {
    try {
        let templateToSave = {
            template_name: templateDef['templateName'],
            published: templateDef['published'],
            // modified_at: to_timestamp(Date.now() / 1000.0)
        };

        if (templateId){
            await updateTemplateDef(clientCode, templateId, templateToSave);
        } else {
            await insertTemplateDef(clientCode, templateToSave.template_name);
        }
    } catch (error) {
        console.log(error);
        return `failed to save template`;
    }
};

const saveTemplateColumn = async (clientCode, templateId, templateColumn, templateColumnId) => {
    try {
        let templateColumnToSave = {
            template_id: templateId,
            dest_column_id: templateColumn['destColumnId'],
            mapping_type: templateColumn['mappingType'],
            mapping_value: templateColumn['mappingValue'],
            // modified_at: to_timestamp(Date.now() / 1000.0)
        };

        if (templateColumnId){
            await updateTemplateColumn(clientCode, templateColumnId, templateColumnToSave);
        } else {
            await insertTemplateColumn(clientCode, templateColumnToSave);
        }
    } catch (error) {
        console.log(error);
        return `failed to save template column for templateId ${templateId} client ${clientCode}`;
    }
}

module.exports = {
    saveTemplateDef,
    saveTemplateColumn
};