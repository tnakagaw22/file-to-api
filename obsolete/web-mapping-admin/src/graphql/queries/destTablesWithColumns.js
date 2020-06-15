import gql from 'graphql-tag'

const destTablesWithColumns = gql`
query getDestTables ($schema: String!) {
    destTables(schema: $schema) {
      id
      name,
      columns {
        id
        tableId
        name,
        dataType,
        required
      }
    }
  }
`
export default destTablesWithColumns