import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

const DestTableColumnList = (props) => {

    let rows = props.destTableColumns.map((destTableColumn => {
        let requiredCell = destTableColumn.required ? <Icon color='green' name='checkmark' size='large' /> : '';

        return (
            <Table.Row key={destTableColumn.id}>
                <Table.Cell>{destTableColumn.columnName}</Table.Cell>
                <Table.Cell>{destTableColumn.dataType}</Table.Cell>
                <Table.Cell>{requiredCell}</Table.Cell>
            </Table.Row>
        )
    }));

    return (
        <Table striped sortable fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Column name</Table.HeaderCell>
                    <Table.HeaderCell>Data type</Table.HeaderCell>
                    <Table.HeaderCell>Required</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {rows}
            </Table.Body>
        </Table>
    );
}

export default DestTableColumnList;