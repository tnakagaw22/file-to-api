
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('dev.template_columns').del();
  await knex('dev.template_defs').del();

  // Inserts seed entries
  await knex('dev.template_defs').insert([
    { id: 1, template_name: 'olr_file', published: true, valid: true}
  ]);

  let listing_status_rule = {
    conditions: {
        any: [{
            fact: 'listingStatus',
            operator: 'equal',
            value: "A"
        }]
      },
      event: {
        type: 'mappingValue',
        params: {
          message: 'Active'
        }
      }
};

  await knex('dev.template_columns').insert([
    { id: 1, template_id: 1, dest_column_id: 1, mapping_type: 'column', mapping_value: 'mlsNum' },
    { id: 2, template_id: 1, dest_column_id: 2, mapping_type: 'column', mapping_value: 'price', },
    { id: 3, template_id: 1, dest_column_id: 3, mapping_type: 'rule', mapping_value: JSON.stringify(listing_status_rule) },
    { id: 4, template_id: 1, dest_column_id: 4, mapping_type: 'column', mapping_value: 'streetAddr' },
    { id: 5, template_id: 1, dest_column_id: 5, mapping_type: 'column', mapping_value: 'zipCode' },
    { id: 6, template_id: 1, dest_column_id: 6, mapping_type: 'column', mapping_value: 'desc' },
  ]);
};
