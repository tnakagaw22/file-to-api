
exports.up = async knex => {
    await knex.schema.withSchema('dev')
    .table('dest_tables', table => {
        table.specificType('identifiers', 'character varying[]')
    })
};

exports.down = async knex => {
    await knex.schema.withSchema('dev')
    .table('dest_tables', table => {
        table.dropColumn('identifiers')
    })
};