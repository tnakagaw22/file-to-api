import React, { useState } from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";

const DoubleClickEditCell = (props) => {
  const [originalValue] = useState(props.value);
  const [isEditable, setIsEditable] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const onBlur = () => {
    setIsEditable(false);
    setIsChanged(originalValue !== props.value);
  };

  return (
    <TableCell
      onDoubleClick={() => setIsEditable(true)}
      onBlur={() => onBlur()}
    >
      {isEditable ? (
        <TextField
          value={props.value}
          onChange={(e) => { props.onChange(e.target.value) }}
          autoFocus
        />
      ) : (
        props.value
      )}

      {isChanged && <EditIcon/>}
    </TableCell>
  );
};

DoubleClickEditCell.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default DoubleClickEditCell;
