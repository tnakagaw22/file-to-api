import React from 'react'
import { Form } from 'semantic-ui-react'

const DestTableMultipleSelection = (props) => (
    <Form.Select
        placeholder='Select tables to map'
        label='Dest table to map'
        fluid multiple selection
        {...props}
    />
)

export default DestTableMultipleSelection