import React from 'react'
import { Form } from 'semantic-ui-react'

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

const MappingTypeSelection = (props) => (
  <Form.Select
    placeholder='Select Mapping type'
    label='Mapping type'
    selection
    clearable
    options={mappingTypeOptions}
    {...props}
  />
)

export default MappingTypeSelection