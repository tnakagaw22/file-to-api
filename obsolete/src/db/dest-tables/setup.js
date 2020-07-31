'use strict';

const db = require("../index");

const createDestTable = (clientCode, knex) => {
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
        .createTable('dest_tables', function (dest_table) {
            dest_table.increments('id').unsigned().primary();
            dest_table.string('table_name', 200).notNull();
            dest_table.boolean('published').defaultTo(false);
            dest_table.boolean('valid').defaultTo(true);
            dest_table.boolean('searchable').defaultTo(true);
            dest_table.timestamp('created_at').defaultTo(getNow());
        })
}

const createDestColumn = (clientCode, knex) => {
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
    .createTable('dest_columns', function(dest_column) {
        dest_column.increments('id').unsigned().primary();
        dest_column.integer('table_id').unsigned().notNull().references('id').inTable(`${clientCode}.dest_tables`);
        dest_column.string('column_name', 200).notNull();
        dest_column.string('data_type', 50).notNull();
        dest_column.boolean('required').defaultTo(false);
        dest_column.timestamp('created_at').defaultTo(getNow());
        dest_column.timestamp('modified_at').defaultTo(getNow());
        });
}

module.exports = {
    createDestTable,
    createDestColumn
};