
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('dev.mapping_definitions').del();

  // Inserts seed entries
  await knex('dev.mapping_definitions').insert([
    { id: 1, srcFileName: 'OLR-OneKeyMls', destTableName: 'listings' },
    { id: 2, srcFileName: 'OLR-OneKeyMls', destTableName: 'buildings' },
  ]);
};
