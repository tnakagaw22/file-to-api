
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('demo1.dest_columns').del();
  await knex('demo1.dest_tables').del();

  // Inserts seed entries
  await knex('demo1.dest_tables').insert([
    { id: 1, table_name: 'listings', published: true, valid: true}
  ]);
  await knex('demo1.dest_columns').insert([
    { table_id: 1, column_name: 'mls_number', data_type: 'string', required: true},
    { table_id: 1, column_name: 'price', data_type: 'decimal', required: true},
    { table_id: 1, column_name: 'status', data_type: 'string', required: true},
    { table_id: 1, column_name: 'desc', data_type: 'string', required: false},
  ]);
};
