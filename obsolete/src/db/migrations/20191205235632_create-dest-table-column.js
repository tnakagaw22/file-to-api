const { createDestTable, createDestColumn } = require("../dest-tables/setup");

exports.up = async knex => {
    await knex.raw('CREATE SCHEMA IF NOT EXISTS dev');

    await createDestTable('dev', knex);
    await createDestColumn('dev', knex);

};

exports.down = async knex => {
    await knex.schema.withSchema('dev').dropTable('dest_columns');
    await knex.schema.withSchema('dev').dropTable('dest_tables');
};
