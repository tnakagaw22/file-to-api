import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import ExistingTableStoreProvider from '../existingTableStore';
import ExistingTableList from '../ExistingTableList';

const get_existing_table_query = gql`
{
    existingTables {
        schemaName,
        tableName
  }
}
`;

const ExistingTableListPage = (props) => {
    return (
        <ExistingTableStoreProvider>
            <Query query={get_existing_table_query}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return console.log(error); <div>Error</div>

                    return (
                        <ExistingTableList existingTables={data.existingTables} />
                    )
                }}
            </Query>
        </ExistingTableStoreProvider>
    );
}

export default ExistingTableListPage;