'use strict';

const db = require("../");

const insertTemplateDef = async (clientCode, templateName) => {

    // TODO: create unique index for template_name and handle not to insert dup template

    return await db(`${clientCode}.template_defs`).insert(
        { template_name: templateName, published: false, valid: true }
    ).returning('id');
}

const updateTemplateDef = async (clientCode, templateId, templateUpdateValue) => {

    return await db(`${clientCode}.template_defs`)
        .where({ id: templateId })
        .update(templateUpdateValue)
}

module.exports = {
    insertTemplateDef,
    updateTemplateDef
};