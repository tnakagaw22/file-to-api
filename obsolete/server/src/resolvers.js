module.exports = {
  Query: {
    mappingDefinitions: async (_, __, { dataSources }) => {
      return dataSources.mappingDefinitionAPI.getMappingDefinitions();
    },
    mappingDefinition: async (_, { id }, { dataSources }) => {
      console.log(id)
      return dataSources.mappingDefinitionAPI.getMappingDefinition(id);
    },
  },
  Mutation: {
    saveMappingDefinition: async (_, { mappingDefinition} , { dataSources}) => {
      let id = await dataSources.mappingDefinitionAPI.save(mappingDefinition);
      console.log(id)
      const mappingDef = await dataSources.mappingDefinitionAPI.getMappingDefinition(id);

      return {
        success: true,
        message: "successfully saved",
        mappingDefinition: mappingDef,
      };

    }
  },
};
