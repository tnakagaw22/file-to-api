
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('dev.dest_columns').del();
  await knex('dev.dest_tables').del();

  // Inserts seed entries
  await knex('dev.dest_tables').insert([
    { id: 1, table_name: 'listings', published: true, valid: true },
    { id: 2, table_name: 'buildings', published: true, valid: true }
  ]);
  await knex('dev.dest_columns').insert([
    { id: 1, table_id: 1, column_name: 'mls_number', data_type: 'string', required: true },
    { id: 2, table_id: 1, column_name: 'price', data_type: 'decimal', required: true },
    { id: 3, table_id: 1, column_name: 'status', data_type: 'string', required: true },
    { id: 4, table_id: 2, column_name: 'street_address', data_type: 'string', required: true },
    { id: 5, table_id: 2, column_name: 'zip_code', data_type: 'integer', required: true },
    { id: 6, table_id: 2, column_name: 'desc', data_type: 'string', required: false }
  ]);
};
