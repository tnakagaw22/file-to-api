import React from "react";
import PropTypes from "prop-types";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

import DoubleClickEditCell from "./DoubleClickEditCell";

FieldMappings.propTypes = {
  destFieldName: PropTypes.string,
  isIdentifier: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

function FieldMappings(props) {
  //   const fieldMapping = {props.destFieldName,

  const onChangeCell = (fieldName, newValue) => {
    const updatedFieldMapping = {
      destFieldName:
        fieldName === "destFieldName" ? newValue : props.destFieldName,
      destType: props.destFieldName,
      isIdentifier: fieldName === "isIdentifier" ? newValue : props.isIdentifier,
      value: fieldName === "value" ? newValue : props.value,
    };
    props.onChange(updatedFieldMapping);
  };

  return (
    <TableRow hover>
      <DoubleClickEditCell
        value={props.destFieldName}
        onChange={(newValue) => onChangeCell("destFieldName", newValue)}
      />
      <TableCell>{props.destFieldName}</TableCell>
      <TableCell>
        <Checkbox 
        checked={props.isIdentifier}
        onChange={(newValue) => onChangeCell("isIdentifier", newValue.currentTarget.checked)}
        />
      </TableCell>
      <DoubleClickEditCell
        value={props.value}
        onChange={(newValue) => onChangeCell("value", newValue)}
      />
      <TableCell>
        <IconButton aria-label="delete" onClick={props.onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default FieldMappings;
