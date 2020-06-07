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

  `;

module.exports = typeDefs;
