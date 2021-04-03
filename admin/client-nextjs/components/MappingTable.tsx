import React from 'react';
import Table from 'react-bootstrap/Table';

import { DestTableColumn } from '../models/destTableColumn';

type MappingTableProps = {
    destTableColumns: DestTableColumn[]
};

export const MappingTable = (props: MappingTableProps) => {

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Required</th>
                    <th>Data Type</th>
                </tr>
            </thead>
            <tbody>
                {props.destTableColumns.map((destTableColumn, index) => {
                    return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{destTableColumn.name}</td>
                        <td>{destTableColumn.isRequired === true ? "Y" : "N"}</td>
                        <td>{destTableColumn.dataType}</td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}