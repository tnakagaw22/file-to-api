
exports.up = async knex => {
    await knex.schema.withSchema('dev')
    .createTable('template_defs', function(template_def) {
        template_def.increments('id').unsigned().primary();
        template_def.string('template_name', 200).notNull();
        template_def.boolean('published').defaultTo(false);
        template_def.boolean('valid').defaultTo(true);
        template_def.timestamp('created_at').defaultTo(knex.fn.now())
        template_def.timestamp('modified_at').defaultTo(knex.fn.now());
    });

    await knex.schema.withSchema('dev')
    .createTable('template_columns', function(template_columns) {
        template_columns.increments('id').unsigned().primary();
        template_columns.integer('template_id').unsigned().notNull().references('id').inTable('dev.template_defs');
        template_columns.integer('dest_column_id').unsigned().notNull().references('id').inTable('dev.dest_columns');
        template_columns.enu('mapping_type', ['column', 'rule']);
        template_columns.string('mapping_value', 2000);
        template_columns.timestamp('created_at').defaultTo(knex.fn.now())
        template_columns.timestamp('modified_at').defaultTo(knex.fn.now());
    });

};

exports.down = async knex => {
    await knex.schema.withSchema('dev').dropTable('template_columns');
    await knex.schema.withSchema('dev').dropTable('template_defs');
};
