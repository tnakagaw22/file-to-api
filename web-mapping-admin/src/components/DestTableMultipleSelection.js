import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DestTableMultipleSelection = (props) => (
    <Dropdown
        placeholder='Select tables to map'
        fluid multiple selection
        {...props}
    />
)

export default DestTableMultipleSelection