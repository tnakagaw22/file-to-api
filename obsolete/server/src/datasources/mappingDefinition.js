const { DataSource } = require("apollo-datasource");

const db = require("../../../../src/db/");

class MappingDefinitionAPI extends DataSource {
  //   constructor({ store }) {
  //     super();
  //     this.store = store;
  //   }

  constructor() {
    super();

    const tempContext = this.context || {};
    this.client = tempContext.client || "dev";
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async getMappingDefinitions() {
    return await db("mapping_definitions").withSchema(this.client);
  }

  async getMappingDefinition(id) {
    return await db("mapping_definitions")
      .withSchema(this.client)
      .where({ id })
      .first();
  }

  async save(mappingDef) {
    const { srcFileName, destTableName } = mappingDef;
    const savingFields = { srcFileName, destTableName };

    if (mappingDef.id) {
      await db("mapping_definitions")
        .withSchema(this.client)
        .where({ id: mappingDef.id })
        .update(savingFields);
      return mappingDef.id;
    } else {
      let newId = await db("mapping_definitions")
        .withSchema(this.client)
        .insert(savingFields)
        .returning("id");

      return newId[0];
    }
  }
}

module.exports = MappingDefinitionAPI;
