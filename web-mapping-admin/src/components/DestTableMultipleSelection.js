import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DestTableMultipleSelection = (props) => (
    <Dropdown
        placeholder='Select tables to map'
        options={props.options}
        onChange={props.onChange}
        fluid multiple selection
    />
)

export default DestTableMultipleSelection