const { gql } = require("apollo-server");

const typeDefs = gql`
  type MappingDefinition {
    id: ID!
    srcFileName: String
    destTableName: String
  }

  type Query {
    mappingDefinitions: [MappingDefinition]
    mappingDefinition(id: ID!): MappingDefinition
  }

  type Mutation {
    createMappingDefinition(
      newMappingDef: MappingDefinitionSaveInput!
    ): MappingDefinitionSaveResponse!
    saveMappingDefinition(
      mappingDefinition: MappingDefinitionSaveInput!
    ): MappingDefinitionSaveResponse!
  }

  type MappingDefinitionSaveResponse {
    success: Boolean!
    message: String
    mappingDefinition: MappingDefinition
  }

  input MappingDefinitionSaveInput {
    id: ID
    srcFileName: String!
    destTableName: String!
  }
`;

module.exports = typeDefs;
