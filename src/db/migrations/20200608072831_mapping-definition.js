
exports.up = async function(knex) {
    await knex.schema.withSchema('dev').createTable('mapping_definitions', function(t) {
        t.increments('id').unsigned().primary();
        t.string('srcFileName', 200).notNull();
        t.string('destTableName', 200).notNull();
        t.unique(['srcFileName', 'destTableName']);
    });
};

exports.down = function(knex) {
    return knex.schema.withSchema('dev').dropTable('mapping_definitions');
};