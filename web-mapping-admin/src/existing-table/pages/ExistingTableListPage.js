import React from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import { Query } from 'react-apollo'

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
        tableName
  }
}
`;

const ExistingTableListPage = (props) => {
    const { loading: getDestTableLoading, error: getDestTableError, data } = useQuery(getDestTables);

    return (
        <ExistingTableStoreProvider>
            <Query query={getExistingTable}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return console.log(error); <div>Error</div>

                    return (
                        <ExistingTableList existingTables={data.existingTables} />
                    )
                }}
            </Query>

            {getDestTableLoading && <p>Loading...</p>}
            {getDestTableError && <p>Error...</p>}
            {data && <MappingTableList tables={data.destTables} />}

            {/* <Query query={getDestTables}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return console.log(error); <div>Error</div>

                    return (
                        <MappingTableList tables={data.destTables} mapToDestTable={unmapFromDestTable} />
                    )
                }}
            </Query> */}
        </ExistingTableStoreProvider>
    );
}

export default ExistingTableListPage;