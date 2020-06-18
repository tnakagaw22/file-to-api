
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('dev.mapping_definitions').del();

  // Inserts seed entries
  await knex('dev.mapping_definitions').insert([
    { id: 1, srcFileName: 'OLR-OneKeyMls', destTableName: 'listings', fieldMappings:{ data: [{destFieldName: 'ListingKey', destFieldType: 'nvarchar(50)', destRequired: true, mappingType: 'Column', value : 'listingKey'},{destFieldName: 'Status', destFieldType: 'nvarchar(50)', destRequired: true, mappingType: 'Column', value : 'status'}] }},
    { id: 2, srcFileName: 'OLR-OneKeyMls', destTableName: 'buildings', fieldMappings: null },
  ]);
};
