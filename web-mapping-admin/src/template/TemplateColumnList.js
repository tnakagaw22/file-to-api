import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

const TemplateColumnList = (props) => {

    let rows = props.templateColumns.map((templateColumn => {
        let requiredCell = templateColumn.required ? <Icon color='green' name='checkmark' size='large' /> : '';

        return (
            <Table.Row key={templateColumn.id}>
                <Table.Cell>{templateColumn.destColumnName}</Table.Cell>
                <Table.Cell>{templateColumn.mappingType}</Table.Cell>
                <Table.Cell>{templateColumn.mappingValue}</Table.Cell>
            </Table.Row>
        )
    }));

    return (
        <Table striped sortable fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Column name</Table.HeaderCell>
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

export default TemplateColumnList;