const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')

const { getClient } = require("./headerHelper");
const {
  getMappingDefinitions,
  getMappingDefinition,
  saveMappingDefinition,
  deleteMappingDefinition,
} = require("../datasources/mappingDefinitions");

router.get("/", asyncHandler(async (req, res, next) => {
  // for (const key in req.query) {
  //     console.log(key, req.query[key])
  //   }
  const mappings = await getMappingDefinitions(getClient(req));
  res.json(mappings);
}));

router.get("/:id", asyncHandler(async (req, res) => {
  if (req.params.id == 0) {
    res.json({});
    return;
  }
  const mapping = await getMappingDefinition(getClient(req), req.params.id);

  if (mapping) {
    // mappings.fieldMappings = JSON.parse(mappings.fieldMappings);
    res.json(mapping);
  } else {
    throw createError(400, `No mapping definition with the id of ${req.params.id}`)
  }
}));

router.post("/", asyncHandler(async (req, res) => {
  const newMapping = {
    srcFileName: req.body.srcFileName,
    destTableName: req.body.destTableName,
  };

  if (!newMapping.srcFileName || !newMapping.destTableName) {
    throw createError(400, `Please include a srcFileName and destTableName`)
  }

  const id = await saveMappingDefinition(getClient(req), newMapping);
  res.json({ ...newMapping, id });
}));

router.put("/:id", asyncHandler(async (req, res) => {
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
    existingMapping.fieldMappings = updMapping.fieldMappings
      ? updMapping.fieldMappings
      : existingMapping.fieldMappings;

    await saveMappingDefinition(clientCode, existingMapping);
    res.json({ msg: "Mapping updated", existingMapping });
  } else {
    throw createError(400, `No mapping with the id of ${req.params.id}`)
  }
}));

router.delete("/:id", asyncHandler(async (req, res) => {
  const clientCode = getClient(req);
  const existingMapping = await getMappingDefinition(clientCode, req.params.id);

  if (existingMapping) {
    await deleteMappingDefinition(clientCode, req.params.id);
    res.json({
      msg: "Mapping deleted",
    });
  } else {
    throw createError(400, `No mapping with the id of ${req.params.id}`)
  }
}));

module.exports = router;
