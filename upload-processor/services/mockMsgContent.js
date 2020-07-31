const msgContent = {
	mapping: {
		id: 24,
		srcFileName: "test-temp333",
		destTableName: "listings",
		fieldMappings: [{
				"value": "listingKey",
				"destType": "ListingKey",
				"destFieldName": "ListingKey"
			}, {
				"value": "status",
				"destType": "Status",
				"destFieldName": "Status"
			}, {
				"value": "address",
				"destType": "Address",
				"destFieldName": "Address"
			}
		]
	},
	fileName: "docker rabbit-1596113520435.txt"
}

module.exports = {
    msgContent: JSON.stringify(msgContent)
  };
  