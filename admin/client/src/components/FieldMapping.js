import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import DoubleClickEditCell from "./DoubleClickEditCell";
import { fieldsConflictMessage } from "graphql/validation/rules/OverlappingFieldsCanBeMerged";

FieldMapping.propTypes = {
  fieldMappings: PropTypes.array,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

function FieldMapping(props) {
  const classes = useStyles();

  const onChangeSrcField = (newValue, updatingFieldMapping) => {
    const updatedFieldMapping = { ...updatingFieldMapping, value: newValue };
    props.onChange(updatedFieldMapping);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Dest Field</TableCell>
              <TableCell>Dest Type</TableCell>
              <TableCell>Dest Requried</TableCell>
              <TableCell>Src Field</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.fieldMappings.map((fieldMapping) => {
              return (
                <TableRow hover>
                  <TableCell>{fieldMapping.destFieldName}</TableCell>
                  <TableCell>{fieldMapping.destFieldName}</TableCell>
                  <TableCell>{fieldMapping.destFieldName}</TableCell>
                  <DoubleClickEditCell
                    value={fieldMapping.value}
                    onChange={(newValue) =>
                      onChangeSrcField(newValue, fieldMapping)
                    }
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FieldMapping;
