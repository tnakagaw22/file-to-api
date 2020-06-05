import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Table, Input, Icon } from "semantic-ui-react";

const DoubleClickEditCell = (props) => {
  const [originalValue] = useState(props.value);
  const [cellValue, setCellValue] = useState(props.value);
  const [isEditable, setIsEditable] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const onBlur = () => {
    setIsEditable(false);
    setIsChanged(originalValue !== cellValue);

    if (props.onSave) {
      props.onSave(cellValue);
    }
  };

  return (
    <Table.Cell
      onDoubleClick={() => setIsEditable(true)}
      onBlur={() => onBlur()}
    >
      {isEditable ? (
        <Input
          value={cellValue}
          onChange={(e) => {
            setCellValue(e.target.value);
            console.log(e.target.value)}}
          focus
        />
      ) : (
        cellValue
      )}

      {isChanged && <Icon link name="pencil alternate" />}
    </Table.Cell>
  );
};

DoubleClickEditCell.propTypes = {
    value: PropTypes.string,
    onSave: PropTypes.func
  };

export default DoubleClickEditCell;
