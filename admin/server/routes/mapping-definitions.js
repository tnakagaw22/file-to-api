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


/**
 * @swagger
 * definitions:
 *   mapping-definition:
 *     properties:
 *       srcFileName:
 *         type: string
 *       destTableName:
 *         type: string
 *       fieldMappings:
 *         type: array
 */


/**
 * @swagger
 * /api/mapping-definitions:
 *   get:
 *     tags:
 *       - mapping-definitions
 *     description: Returns all mapping-definitions
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of mapping-definitions
 *         schema:
 *           $ref: '#/definitions/mapping-definition'
 */
router.get("/", asyncHandler(async (req, res, next) => {
  // for (const key in req.query) {
  //     console.log(key, req.query[key])
  //   }
  const mappings = await getMappingDefinitions(getClient(req));
  res.json(mappings);
}));

/**
 * @swagger
 * /api/mapping-definitions/{id}:
 *   get:
 *     tags:
 *       - mapping-definitions
 *     description: Returns a single mapping-definition
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: mapping-definition's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single mapping-definition
 *         schema:
 *           $ref: '#/definitions/mapping-definition'
 */
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

/**
 * @swagger
 * /api/mapping-definitions:
 *   post:
 *     tags:
 *       - mapping-definitions
 *     description: Creates a new mapping-definition
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mapping-definition
 *         description: mapping-definition object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/mapping-definition'
 *     responses:
 *       200:
 *         description: Successfully created
 */
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

/**
 * @swagger
 * /api/mapping-definitions:
 *   put:
 *     tags:
 *       - mapping-definitions
 *     description: Updates a new mapping-definition
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mapping-definition
 *         description: mapping-definition object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/mapping-definition'
 *     responses:
 *       200:
 *         description: Successfully created
 */
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

/**
 * @swagger
 * /api/mapping-definitions/{id}:
 *   delete:
 *     tags:
 *       - mapping-definitions
 *     description: Deletes a single mapping-definition
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: mapping-definition's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
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
