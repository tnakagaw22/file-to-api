import React, { useContext, useState, useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import { ExistingTableStoreContext } from './existingTableStore';
import { setExistingTables, mapToDestTable, unmapFromDestTable } from './existingTableAction';
import { LoadDestTables } from '../dest-table/destTableAction';


const ExistingTable = (props) => {
    const { existingTables, mappedDestTables, dispatch } = useContext(ExistingTableStoreContext);
    // const { loading, error, data } = useQuery(get_existing_table_query, {
    //     variables: {
    //         limit: 10
    //     }
    // });

    useEffect(() => {
        LoadDestTables(dispatch);
        setExistingTables(dispatch, props.existingTables);
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

                        <List selection>
                            {existingTables.map(existingTable => <List.Item
                                key={`${existingTable.schemaName}.${existingTable.tableName}`}
                                onClick={() => {
                                    unmapFromDestTable(dispatch, existingTable);
                                }}
                            >{`${existingTable.schemaName}.${existingTable.tableName}`}
                            </List.Item>)}
                        </List>

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