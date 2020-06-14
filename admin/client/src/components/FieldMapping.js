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

FieldMapping.propTypes = {};

const columns = [
  { id: "desteFieldName", label: "Dest Field", minWidth: 170 },
  { id: "destFieldType", label: "Dest Type", minWidth: 100 },
  {
    id: "destRequired",
    label: "Required",
    minWidth: 100,
    format: (value) => <input type="checkbox" value />
  },
  {
    id: "srcFieldName",
    label: "srcFieldName",
    minWidth: 170,
  },
  // {
  //   id: "size",
  //   label: "Size\u00a0(km\u00b2)",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  // {
  //   id: "density",
  //   label: "Density",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toFixed(2),
  // },
];

function createData(desteFieldName, destFieldType, destRequired, srcFieldName) {
  return { desteFieldName, destFieldType, destRequired, srcFieldName };
}

const rows = [
  createData("ListingKey", "vnarchar(50)", true, "listingKey"),
  createData("Status", "vnarchar(50)", true, "status"),
  createData("Price", "decimal", true, "rent"),
  createData("BuiltYear", "int", false, "year"),
];

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
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    console.log(row);
                    console.log(column.id);
                    console.log(value);
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && (typeof value === "number" || typeof value === "boolean")
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
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
