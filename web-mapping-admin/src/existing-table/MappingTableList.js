import React from 'react';
import { List } from 'semantic-ui-react';

const MappingTableList = (props) => {

    let mappedTables = props.tables.map(table => {
        return <List.Item
            key={table.tableName}
            onClick={() => {
                // props.moveTable(dispatch, table);
                console.log(`clicked ${table.tableName}`);
            }}
        >{table.tableName}
        </List.Item>
    });

    return (
        <div>
        <List selection>
            {mappedTables}
        </List>
        </div>
    );
}

export default MappingTableList;