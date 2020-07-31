'use strict';

const db = require("../index");

const createTemplateDef = (clientCode, knex) => {
    let schemaBuiilder;
    let getNow;
    
    if (knex) {
        schemaBuiilder = knex.schema.withSchema(clientCode)
        getNow = () => knex.fn.now();
    } else {
        schemaBuiilder = db.schema.withSchema(clientCode)
        getNow = () => db.fn.now();
    }

    return schemaBuiilder
        .createTable('template_defs', function (template_def) {
            template_def.increments('id').unsigned().primary();
            template_def.string('template_name', 200).notNull();
            template_def.boolean('published').defaultTo(false);
            template_def.boolean('valid').defaultTo(true);
            template_def.timestamp('created_at').defaultTo(getNow())
            template_def.timestamp('modified_at').defaultTo(getNow());
        })
}

const createTemplateColumn = (clientCode, knex) => {
    let schemaBuiilder;
    let getNow;
 
    if (knex) {
        schemaBuiilder = knex.schema.withSchema(clientCode)
        getNow = () => knex.fn.now();
    } else {
        schemaBuiilder = db.schema.withSchema(clientCode)
        getNow = () => db.fn.now();
    }

    return schemaBuiilder
        .createTable('template_columns', function (template_columns) {
            template_columns.increments('id').unsigned().primary();
            template_columns.integer('template_id').unsigned().notNull().references('id').inTable(`${clientCode}.template_defs`);
            template_columns.integer('dest_column_id').unsigned().notNull().references('id').inTable(`${clientCode}.dest_columns`);
            template_columns.enu('mapping_type', ['column', 'rule']);
            template_columns.string('mapping_value', 2000);
            template_columns.timestamp('created_at').defaultTo(getNow())
            template_columns.timestamp('modified_at').defaultTo(getNow());
        });
}

module.exports = {
    createTemplateDef,
    createTemplateColumn
};