import React from 'react'
import { Form } from 'semantic-ui-react'

const DestTableSelection = (props) => (
    <Form.Select
        placeholder='Select tables to map'
        label='Dest table to map'
        fluid selection
        {...props}
    />
)

export default DestTableSelection