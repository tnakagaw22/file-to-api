import React from "react";
import PropTypes from "prop-types";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

import DoubleClickEditCell from "./DoubleClickEditCell";

FieldMappings.propTypes = {
  destFieldName: PropTypes.string,
  destRequired: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

function FieldMappings(props) {
  //   const fieldMapping = {props.destFieldName,

  const onChangeCell = (fieldName, newValue) => {
    const updatedFieldMapping = {
      destFieldName: fieldName === 'destFieldName' ? newValue: props.destFieldName,
      destType: props.destFieldName,
      destRequired: props.destRequired,
      value: fieldName === 'value' ? newValue: props.value,
    };
    props.onChange(updatedFieldMapping);
  };

  return (
    <TableRow hover>
      <DoubleClickEditCell
        value={props.destFieldName}
        onChange={(newValue) => onChangeCell('destFieldName', newValue)}
      />
      <TableCell>{props.destFieldName}</TableCell>
      <TableCell>
        <Checkbox checked={props.destRequired} />
      </TableCell>
      <DoubleClickEditCell
        value={props.value}
        onChange={(newValue) => onChangeCell('value', newValue)}
      />
    </TableRow>
  );
}

export default FieldMappings;
