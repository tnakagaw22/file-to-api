import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const mappingTypeOptions = [
  {
    key: 'column',
    text: 'Column',
    value: 'column'
  },
  {
    key: 'rule',
    text: 'Rule',
    value: 'rule'
  }
]

const MappingTypeSelection = () => (
  <Dropdown
    placeholder='Select Mapping type'
    label='Mapping type'
    selection
    clearable
    options={mappingTypeOptions}
  />
)

export default MappingTypeSelection