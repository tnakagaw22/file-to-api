import React from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import { Query } from 'react-apollo'
import { Grid, List } from 'semantic-ui-react';

import ExistingTableStoreProvider from '../existingTableStore';
import ExistingTableList from '../ExistingTableList';
import MappingTableList from '../MappingTableList';
import { setExistingTables, mapToDestTable, unmapFromDestTable } from '../existingTableAction';

const getExistingTable = gql`
{
    existingTables {
        schemaName,
        tableName
  }
}
`;

const getDestTables = gql`
{
    destTables (schema:"dev") {
        id,
        tableName,
        destColumns {
          column_name
        }
  }
}
`;

const ExistingTableListPage = (props) => {
    const { loading: getExistingTableLoading, error: getExistingTableError, data: getExistingTableData } = useQuery(getExistingTable);
    const { loading: getDestTableLoading, error: getDestTableError, data: getDestTableData } = useQuery(getDestTables);

    return (
        <ExistingTableStoreProvider>

            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        Existing tables
                        {getExistingTableLoading && <p>Loading...</p>}
                        {getExistingTableError && <p>Error...</p>}
                        {getExistingTableData &&
                            <MappingTableList
                                tables={getExistingTableData.existingTables}
                                moveTable={mapToDestTable}
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