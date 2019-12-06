
exports.up = function(knex) {
    return knex.schema.createTable('public.api_keys', function(t) {
        t.increments('id').unsigned().primary();
        t.string('api_key', 100).notNull();
        t.string('client_code').notNull();
        t.boolean('enabled').defaultTo(true);
        t.timestamp('created_at').defaultTo(knex.fn.now())
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('public.api_keys');
};
