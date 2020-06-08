module.exports = {
  Query: {
    mappingDefinitions: async (_, __, { dataSources }) => {
      return dataSources.mappingDefinitionAPI.getMappingDefinitions();
    },
    mappingDefinition: async (_, { id }, { dataSources }) => {
      return dataSources.mappingDefinitionAPI.getMappingDefinition(id);
    },
  },
  Mutation: {
    createMappingDefinition: async (_, { newMappingDef }, { dataSources }) => {
      const newId = await dataSources.mappingDefinitionAPI.create(
        newMappingDef
      );
      const mappingDef = await dataSources.mappingDefinitionAPI.getMappingDefinition(
        newId[0]
      );

      return {
        success: true,
        message: "successfully created",
        mappingDefinition: mappingDef,
      };
    },
  },
};
