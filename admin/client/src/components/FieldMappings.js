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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { IconButton } from "@material-ui/core";

import FieldMapping from "./FieldMapping";

FieldMappings.propTypes = {
  fieldMappings: PropTypes.array,
  onChange: PropTypes.func,
  onAdd: PropTypes.func,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

function FieldMappings(props) {
  const classes = useStyles();

  const onChangeFieldMapping = (updatedIndex, updatedFieldMapping) => {
    const fieldMappings = props.fieldMappings.map((fm, i) =>
      i === updatedIndex ? updatedFieldMapping : fm
    );

    props.onChange(fieldMappings);
  };

  return (
    <Paper className={classes.root}>
      <div>
        <IconButton aria-label="add" onClick={props.onAdd}>
          <AddCircleIcon primary />
        </IconButton>
      </div>
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
            {props.fieldMappings.map((fieldMapping, i) => {
              return (
                <FieldMapping
                  key={fieldMapping.destRequired + i}
                  destFieldName={fieldMapping.destFieldName}
                  destRequired={fieldMapping.destRequired}
                  value={fieldMapping.value}
                  onChange={(updatedFieldMapping) =>
                    onChangeFieldMapping(i, updatedFieldMapping)
                  }
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FieldMappings;
