import React from 'react';
import Form from 'react-bootstrap/Form';
import { FormControl, InputGroup, Button } from 'react-bootstrap';


export const SourceFieldInput = (props: { originalValue: string }) => {
    const [editing, setEditing] = React.useState(false)
    const [value, setValue] = React.useState(props.originalValue)

    return editing ? (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={(e) => setEditing(false)}>Save</Button>
                    <Button variant="outline-secondary" onClick={(e) => {
                        setEditing(false);
                        setValue(props.originalValue);
                    }}>Cancel</Button>
                </InputGroup.Append>
            </InputGroup>

        </>
    ) : (
        <p
            onDoubleClick={() => {
                setEditing(true);
            }}
            style={{cursor:'pointer', padding:'10px'}}
        >{value}</p>
    )
}