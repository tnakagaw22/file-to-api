import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "@reach/router";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { GlobalContext } from "../context/GlobalContext";
import { loadMappingDefinitions } from "../context/api";
import useFetch from "../hooks/useFetch"

const MappingDefinitions = (props) => {
  // const { loading, error, data: resGetMds } = useQuery(GET_MAPPING_DEFINITIONS);
  // const { mappingsDefinitions } = useContext(GlobalContext);
  const [mappingsDefinitions, isLoading, error] = useFetch(loadMappingDefinitions);

  return (
    <div>
      test from mapping definitions
      <div>
        <Link to={`/mapping-definition/`}>
          <AddCircleIcon />
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Src</TableCell>
              <TableCell>Dest</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappingsDefinitions.map((def) => (
              <TableRow key={def.id}>
                {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                <TableCell>
                  <Link to={`/mapping-definition/${def.id}`}>
                    <EditIcon />
                  </Link>
                </TableCell>
                <TableCell>{def.srcFileName}</TableCell>
                <TableCell>{def.destTableName}</TableCell>
                <TableCell>
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default MappingDefinitions;

// const GET_MAPPING_DEFINITIONS = gql`
//   query {
//     mappingDefinitions {
//       id
//       srcFileName
//       destTableName
//     }
//   }
// `;
