const db = require("../../../src/db");

const getMappingDefinitions = async (clientCode) => {
  return await db("mapping_definitions").withSchema(clientCode);
};

const getMappingDefinition = async (clientCode, id) => {
  const mappingDefinition = await db("mapping_definitions")
    .withSchema(clientCode)
    .where({ id })
    .first();

  if (mappingDefinition && mappingDefinition.fieldMappings) {
    mappingDefinition.fieldMappings = mappingDefinition.fieldMappings.data;
  }

  return mappingDefinition;
};

  const saveMappingDefinition = async (clientCode, mappingDef) => {
    const { srcFileName, destTableName } = mappingDef;
    const savingFields = { srcFileName, destTableName };

    if (mappingDef.id) {
      await db("mapping_definitions")
        .withSchema(clientCode)
        .where({ id: mappingDef.id })
        .update(savingFields);
      return mappingDef.id;
    } else {
      let newId = await db("mapping_definitions")
        .withSchema(clientCode)
        .insert(savingFields)
        .returning("id");

      return newId[0];
    }
  }

module.exports = {
  getMappingDefinitions,
  getMappingDefinition,
  saveMappingDefinition
};
