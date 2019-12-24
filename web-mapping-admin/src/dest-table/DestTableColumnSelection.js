import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const destColumnOptions = [
    {
        key: 1, //dest-column-id
        text: 'streetAddr',
        description: 'Table: buildings, Type: string'
    },
    {
        key: 2, //dest-column-id
        text: 'numOfFloor',
        description: 'Table: buildings, Type: integer'
    },
    {
        key: 3, //dest-column-id
        text: 'zipCode',
        description: 'Table: buildings, Type: string'
    }
];

const DestTableColumnSelection = () => (
    <Dropdown
      placeholder='Select Column to map'
      fluid
      selection
      options={destColumnOptions}
    />
  )
  
  export default DestTableColumnSelection