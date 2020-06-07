const { DataSource } = require("apollo-datasource");

class MappingDefinitionAPI extends DataSource {
  //   constructor({ store }) {
  //     super();
  //     this.store = store;
  //   }

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
    const defs = [
      {
        id: 1,
        srcFileName: "OLR-12343",
        destTableName: "listings",
      },
      {
        id: 2,
        srcFileName: "OLR-12343",
        destTableName: "buildings",
      },
    ];

    return defs;
  }

  async getMappingDefinition(id) {
    return {
      id: 2,
      srcFileName: "OLR-12343",
      destTableName: "buildings",
    };
  }
}

module.exports = MappingDefinitionAPI;
