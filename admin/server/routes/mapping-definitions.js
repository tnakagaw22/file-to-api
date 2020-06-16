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

router.get('/', (req, res) => {
    // for (const key in req.query) {
    //     console.log(key, req.query[key])
    //   }
    res.json(mappings)
});

router.get('/:id', (req, res) => {
    const mapping = mappings.find(user => user.id === parseInt(req.params.id));

    if (mapping) {
        res.json(mapping);
    } else {
        res.status(400).json({ msg: `No mapping definition with the id of ${req.params.id}` });
    }
});

router.post('/', (req, res) => {
  const newMapping = {
    id: mappings.length + 1,
    srcFileName: req.body.srcFileName,
    destTableName: req.body.destTableName,
  };

  if (!newMapping.srcFileName || !newMapping.destTableName) {
    return res.status(400).json({ msg: 'Please include a srcFileName and destTableName' });
  }

  mappings.push(newMapping);
  res.json(mappings);
});

router.put('/:id', (req, res) => {
  const found = mappings.some(mapping => mapping.id === parseInt(req.params.id));

  if (found) {
    const updMapping = req.body;
    mappings.forEach(mapping => {
      if (mapping.id === parseInt(req.params.id)) {
        mapping.srcFileName = updMapping.srcFileName ? updMapping.srcFileName : mapping.srcFileName;
        mapping.destTableName = updMapping.destTableName ? updMapping.destTableName : mapping.destTableName;

        res.json({ msg: 'Mapping updated', mapping });
      }
    });
  } else {
    res.status(400).json({ msg: `No mapping with the id of ${req.params.id}` });
  }
});

router.delete('/:id', (req, res) => {
  const found = mappings.some(mapping => mapping.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Mapping deleted',
      members: mappings.filter(mapping => mapping.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No mapping with the id of ${req.params.id}` });
  }
});

module.exports = router;