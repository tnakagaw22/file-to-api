import React from 'react';
import { List } from 'semantic-ui-react';

const MappingTableList = (props) => {

    let mappedTables = props.tables.map(table => {
        return <List.Item
            key={`${table.schema}.${table.name}`}
            onClick={() => {
                props.moveTable({ variables: { schema: table.schema, name: table.name }});
            }}
        >{table.schema}.{table.name}
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