import React from 'react';
import Table from 'react-bootstrap/Table';

import { MappingTableRow } from './MappingTableRow'
import { DestTableColumn } from '../models/destTableColumn';

type MappingTableProps = {
    destTableColumns: DestTableColumn[]
};

export const MappingTable = (props: MappingTableProps) => {

    return (
        <Table striped bordered hover size="sm">
            <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '5%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '35%' }} />
            </colgroup>
            <thead>
                <tr>
                    <th>#</th>
                    <th>DB Field</th>
                    <th>Required</th>
                    <th>Data Type</th>
                    <th>Source Field</th>
                </tr>
            </thead>
            <tbody>
                {props.destTableColumns.map((destTableColumn, index) => {
                    return (
                        <MappingTableRow
                            index={index}
                            destTableColumn={destTableColumn}
                        />
                    )
                })}
            </tbody>
        </Table>
    )
}