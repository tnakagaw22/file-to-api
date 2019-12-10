'use strict';

const db = require("../");

const insertTemplateDef = async (clientCode, templateName) => {

    // TODO: create unique index for template_name and handle not to insert dup template

    return await db(`${clientCode}.template_defs`).insert(
        { template_name: templateName, published: true, valid: true}
      ).returning('id');
}

module.exports = {
    insertTemplateDef
};