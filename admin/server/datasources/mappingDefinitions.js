const db = require("../../../src/db");

class MappingDefinitionDatastore {
  constructor() {
    this.client = "dev";
  }

  async getMappingDefinitions() {
    return await db("mapping_definitions").withSchema(this.client);
  }

  async getMappingDefinition(id) {
    const mappingDefinition = await db("mapping_definitions")
      .withSchema(this.client)
      .where({ id })
      .first();

    if (mappingDefinition){
        mappingDefinition.fieldMappings = mappingDefinition.fieldMappings.data;
    }

    return mappingDefinition;
  }

  //   async save(mappingDef) {
  //     const { srcFileName, destTableName } = mappingDef;
  //     const savingFields = { srcFileName, destTableName };

  //     if (mappingDef.id) {
  //       await db("mapping_definitions")
  //         .withSchema(this.client)
  //         .where({ id: mappingDef.id })
  //         .update(savingFields);
  //       return mappingDef.id;
  //     } else {
  //       let newId = await db("mapping_definitions")
  //         .withSchema(this.client)
  //         .insert(savingFields)
  //         .returning("id");

  //       return newId[0];
  //     }
  //   }
}

module.exports = MappingDefinitionDatastore;
