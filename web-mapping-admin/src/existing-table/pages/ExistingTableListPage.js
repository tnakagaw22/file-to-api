import React from 'react';
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Query } from 'react-apollo'
import { Grid, List } from 'semantic-ui-react';

import ExistingTableStoreProvider from '../existingTableStore';
import ExistingTableList from '../ExistingTableList';
import MappingTableList from '../MappingTableList';
import { setExistingTables, mapToDestTable, unmapFromDestTable } from '../existingTableAction';

const getExistingTable = gql`
{
    clientDatabaseTables {
        schema,
        name
  }
}
`;

const getDestTables = gql`
{
    destTables (schema:"dev") {
        id,
        name,
        schema
  }
}
`;

const saveDestTable = gql`
mutation ($schema: String!, $name: String!) {
    saveToDestTable(schema: $schema, name: $name) {
        source{
            name,
            schema
          },
          dest {
            id,
            name,
            schema
          }
    }
  } 
`;

const ExistingTableListPage = (props) => {
    const { loading: getExistingTableLoading, error: getExistingTableError, data: getExistingTableData } = useQuery(getExistingTable);
    const { loading: getDestTableLoading, error: getDestTableError, data: getDestTableData } = useQuery(getDestTables);
    const [save, { loading, error }] = useMutation(saveDestTable, {
        update(cache, { data }) {
            const cacheDestTable = cache.readQuery({ query: getDestTables });
            const cacheClientTable = cache.readQuery({ query: getExistingTable });
            const newDestTables = cacheDestTable.destTables.push({ id: data.saveToDestTable.dest.id, name: data.saveToDestTable.dest.name })
            const newClientTables = cacheClientTable.clientDatabaseTables.filter(cacheDestTable => {
                return cacheDestTable.schema != data.saveToDestTable.source.schema && cacheDestTable.name != data.saveToDestTable.source.name
            });
            cache.writeQuery({
                query: getExistingTable,
                data: { clientDatabaseTables: newClientTables }
            });
            cache.writeQuery({
                query: getDestTables,
                data: { destTables: newDestTables }
            });
        }
    })
    return (
        <ExistingTableStoreProvider>

            {loading && <p>Loading...</p>}
            {error && <p>Error...</p>}
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        Client database tables
                        {getExistingTableLoading && <p>Loading...</p>}
                        {getExistingTableError && <p>Error...</p>}
                        {getExistingTableData &&
                            <MappingTableList
                                tables={getExistingTableData.clientDatabaseTables}
                                moveTable={save}
                            />}

                    </Grid.Column>
                    <Grid.Column>
                        Mapped tables
                        {getDestTableLoading && <p>Loading...</p>}
                        {getDestTableError && <p>Error...</p>}
                        {getDestTableData &&
                            <MappingTableList
                                tables={getDestTableData.destTables}
                                moveTable={unmapFromDestTable}
                            />}


                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </ExistingTableStoreProvider>
    );
}

export default ExistingTableListPage;