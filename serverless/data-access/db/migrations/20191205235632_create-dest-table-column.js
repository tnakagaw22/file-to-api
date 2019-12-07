
exports.up = async knex => {
    await knex.raw('CREATE SCHEMA IF NOT EXISTS demo1');

    await knex.schema.withSchema('demo1')
    .createTable('destination_tables', function(dest_table) {
        dest_table.increments('id').unsigned().primary();
        dest_table.string('table_name', 200).notNull();
        dest_table.boolean('published').defaultTo(false);
        dest_table.boolean('valid').defaultTo(true);
        dest_table.boolean('searchable').defaultTo(true);
        dest_table.timestamp('created_at').defaultTo(knex.fn.now())
    });

    // .createTable('demo1.source_files', function(dest_table) {
    //     dest_table.increments('id').unsigned().primary();
    //     dest_table.string('source_name', 200).notNull();
    //     dest_table.string('file_name_convention', 200).notNull();
    //     dest_table.boolean('valid').defaultTo(true);
    //     dest_table.boolean('searchable').defaultTo(true);
    //     dest_table.timestamp('created_at').defaultTo(knex.fn.now())
    // })

    await knex.schema.withSchema('demo1')
    .createTable('destination_columns', function(dest_column) {
        dest_column.increments('id').unsigned().primary();
        dest_column.integer('table_id').unsigned().notNull().references('id').inTable('demo1.destination_tables');
        dest_column.string('column_name', 200).notNull();
        dest_column.string('data_type', 50).notNull();
        dest_column.boolean('required').defaultTo(false);
        dest_column.timestamp('created_at').defaultTo(knex.fn.now());
        dest_column.timestamp('modified_at').defaultTo(knex.fn.now());
    });

};

exports.down = async knex => {
    await knex.schema.withSchema('demo1').dropTable('destination_columns');
    await knex.schema.withSchema('demo1').dropTable('destination_tables');
};
