const express = require('express');
const router = express.Router();

const mappings = [
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

// Gets All users
router.get('/', (req, res) => {
    // for (const key in req.query) {
    //     console.log(key, req.query[key])
    //   }
console.log('test')
    res.json(mappings)
});

// Get Single Page
router.get('/:id', (req, res) => {
    const mapping = mappings.find(user => user.id === parseInt(req.params.id));

    if (mapping) {
        res.json(mapping);
    } else {
        res.status(400).json({ msg: `No mapping definition with the id of ${req.params.id}` });
    }
});


module.exports = router;