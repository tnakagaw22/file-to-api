import React from 'react';
import Form from 'react-bootstrap/Form';
import { FormControl } from 'react-bootstrap';

interface MappingProps {
    dbTables: string[];
    onChangeSelect?: React.ChangeEventHandler<HTMLInputElement>
}

export const DestTableSelect = ({ dbTables, onChangeSelect }: MappingProps) => {

    return (
        <Form.Group controlId="mapping.destTable">
        <Form.Label>Destination Table</Form.Label>
        <Form.Control as="select" onChange={onChangeSelect}>
            <option></option>
            {dbTables.map(dbTable => <option>{dbTable}</option>)}
        </Form.Control>
    </Form.Group>
)
}