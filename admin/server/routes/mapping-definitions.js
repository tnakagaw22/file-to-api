const express = require("express");
const router = express.Router();

const {
  getMappingDefinitions,
  getMappingDefinition,
  saveMappingDefinition,
} = require("../datasources/mappingDefinitions");

router.get("/", async (req, res) => {
  // for (const key in req.query) {
  //     console.log(key, req.query[key])
  //   }
  const mappings = await getMappingDefinitions(getClient(req));
  res.json(mappings);
});

router.get("/:id", async (req, res) => {
  if (req.params.id == 0) {
    res.json({});
    return;
  }
  const mapping = await getMappingDefinition(getClient(req), req.params.id);

  if (mapping) {
    // mappings.fieldMappings = JSON.parse(mappings.fieldMappings);
    res.json(mapping);
  } else {
    res
      .status(400)
      .json({ msg: `No mapping definition with the id of ${req.params.id}` });
  }
});

router.post("/", async (req, res) => {
  const newMapping = {
    srcFileName: req.body.srcFileName,
    destTableName: req.body.destTableName,
  };

  if (!newMapping.srcFileName || !newMapping.destTableName) {
    return res
      .status(400)
      .json({ msg: "Please include a srcFileName and destTableName" });
  }

  await saveMappingDefinition(getClient(req), newMapping);
  res.json(mappings);
});

router.put("/:id", async (req, res) => {
  const clientCode = getClient(req);
  const existingMapping = await getMappingDefinition(clientCode, req.params.id);

  if (existingMapping) {
    const updMapping = req.body;

    existingMapping.srcFileName = updMapping.srcFileName
      ? updMapping.srcFileName
      : existingMapping.srcFileName;
    existingMapping.destTableName = updMapping.destTableName
      ? updMapping.destTableName
      : existingMapping.destTableName;
    // existingMapping.fieldMappings = updMapping.fieldMappings
    // ? updMapping.fieldMappings
    // : existingMapping.fieldMappings;

    await saveMappingDefinition(clientCode, existingMapping);
    res.json({ msg: "Mapping updated", existingMapping });
  } else {
    res.status(400).json({ msg: `No mapping with the id of ${req.params.id}` });
  }
});

router.delete("/:id", (req, res) => {
  const found = mappings.some(
    (mapping) => mapping.id === parseInt(req.params.id)
  );

  if (found) {
    res.json({
      msg: "Mapping deleted",
      members: mappings.filter(
        (mapping) => mapping.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No mapping with the id of ${req.params.id}` });
  }
});

const getClient = (req) => {
  return req.headers["clientCode"] || "dev";
};

module.exports = router;
