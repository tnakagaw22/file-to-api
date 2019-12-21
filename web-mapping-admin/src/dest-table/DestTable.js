import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

const DestTable = (props) => {
    let data = [
        { id: 1, name: "buildings", published: true },
        { id: 2, name: "listings", published: false }
    ];

    let rows = data.map((destTable => {
        let publishedCell = destTable.published ? <Icon color='green' name='checkmark' size='large' /> : '';

        return (
            <Table.Row key={destTable.id}>
                <Table.Cell collapsing>
                    <Icon link name='edit' onClick={() => console.log(`clicked ${destTable.id}`)} />
                </Table.Cell>
                <Table.Cell>{destTable.name}</Table.Cell>
                <Table.Cell>{publishedCell}</Table.Cell>
            </Table.Row>
        )
    }));

    return (
        <Table striped sortable fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Published</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {rows}
            </Table.Body>
        </Table>
    );
}

export default DestTable;