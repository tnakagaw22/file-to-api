import React from 'react';
import Form from 'react-bootstrap/Form';

import { SourceFieldInput } from './SourceFieldInput'
import { DestTableColumn } from '../models/destTableColumn';

type MappingTableProps = {
    index: number,
    destTableColumn: DestTableColumn
};

export const MappingTableRow = (props: MappingTableProps) => {

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.destTableColumn.name}</td>
            <td><RequiredCheckBox isRequired={props.destTableColumn.isRequired} /></td>
            <td>{props.destTableColumn.dataType}</td>
            <td><SourceFieldInput originalValue='' /></td>
        </tr>
    )

}

const RequiredCheckBox = (props: { isRequired: boolean }) => {
    return (<Form.Check
        disabled
        type={'checkbox'}
        checked={props.isRequired}
    />
    )
}
