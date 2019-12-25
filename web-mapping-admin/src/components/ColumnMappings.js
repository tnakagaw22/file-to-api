import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

const ColumnMappings = (props) => {

    let rows = props.columns.map((destColumn => {
        let requiredCell = destColumn.required ? <Icon name='checkmark' /> : '';

        return (
            <Table.Row key={destColumn.id}>
                <Table.Cell>{destColumn.tableName}</Table.Cell>
                <Table.Cell>{destColumn.columnName}</Table.Cell>
                <Table.Cell>{destColumn.dataType}</Table.Cell>
                <Table.Cell>{requiredCell}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>
        )
    }));

    return (
        <Table striped sortable fixed>
            <Table.Header>
                <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Table name</Table.HeaderCell>
                <Table.HeaderCell>Column name</Table.HeaderCell>
                <Table.HeaderCell>Data type</Table.HeaderCell>
                <Table.HeaderCell>Requried</Table.HeaderCell>
                    <Table.HeaderCell>Mapping type</Table.HeaderCell>
                    <Table.HeaderCell>Mapping value</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {rows}
            </Table.Body>
        </Table>
    );
}

export default ColumnMappings;