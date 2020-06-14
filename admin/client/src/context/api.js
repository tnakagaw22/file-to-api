export async function loadMappingDefinitions() {
  await stall(1000);

  return [
    {
      id: 1,
      srcFileName: "OLR-OneKeyMls",
      destTableName: "listings",
      fieldMappings:
        '[{"destFieldName": "ListingKey", "mappingType": "Column", "value" : "listingKey"},{"destFieldName": "Status", "mappingType": "Column", "value" : "status"}]',
    },
    {
      id: 2,
      srcFileName: "OLR-OneKeyMls",
      destTableName: "buildings",
      fieldMappings: null,
    },
  ];
}

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}
