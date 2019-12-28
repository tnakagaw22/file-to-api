import React, { useContext, useState, useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { ExistingTableStoreContext } from './existingTableStore';
import { loadExistingTables, mapToDestTable, unmapFromDestTable } from './existingTableAction';
import { LoadDestTables } from '../dest-table/destTableAction';

const get_existing_table_query = gql`
{
    existingTables {
        name
  }
}
`;

const ExistingTable = (props) => {
    const { existingTables, mappedDestTables, dispatch } = useContext(ExistingTableStoreContext);
    // const { loading, error, data } = useQuery(get_existing_table_query, {
    //     variables: {
    //         limit: 10
    //     }
    // });

    useEffect(() => {
        LoadDestTables(dispatch);
        // loadExistingTables(dispatch);
    }, []);

    // let toBeMappedTables = data.existingTables.map(existingTable => <List.Item
    //     key={existingTable.name}
    //     onClick={() => {
    //         console.log('test');
    //         mapToDestTable(dispatch, existingTable);
    //     }}
    // >{existingTable.name}</List.Item>);

    let mappedTables = mappedDestTables.map(mappedDesttable => {
        return <List.Item
            key={mappedDesttable.name}
            onClick={() => {
                unmapFromDestTable(dispatch, mappedDesttable);
            }}
        >{mappedDesttable.name}
        </List.Item>
    });

    return (
        <div>
            <h1>Select tables to map</h1>
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        Existing tables
                        <Query query={get_existing_table_query}>
                            {({ loading, error, data }) => {
                                if (loading) return <div>Fetching</div>
                                if (error) return <div>Error</div>

                                const existingTables = data.existingTables

                                return (
                                    <List selection>
                                        {existingTables.map(existingTable => <List.Item
                                            key={existingTable.name}
                                            onClick={() => {
                                                unmapFromDestTable(dispatch, existingTable);
                                            }}
                                        >{existingTable.name}
                                        </List.Item>)}
                                    </List>
                                )
                            }}
                        </Query>
                    </Grid.Column>
                    <Grid.Column>
                        Mapped tables
                        <List selection>
                            {mappedTables}
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>



        </div>
    );
}

export default ExistingTable;