module.exports = {
  Query: {
    mappingDefinitions: async (_, __, { dataSources }) => {
      return dataSources.mappingDefinitionAPI.getMappingDefinitions();
    },
    mappingDefinition: async (_, { id }, { dataSources }) => {
        return dataSources.mappingDefinitionAPI.getMappingDefinition(id);
    },
  },
};
