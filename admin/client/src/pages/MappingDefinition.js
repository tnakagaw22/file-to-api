import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import MappingDefinitionForm from "../components/MappingDefinitionForm";

const MappingDefinition = (props) => {
  const { loading, error, data } = useQuery(GET_MAPPING_DEFINITION, {
    variables: { mdId: props.id },
  });

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data && !data.mappingDefinition) return <p>Loading..</p>;

  return (
    <div>
      <MappingDefinitionForm
        data={data.mappingDefinition}
        onSave={(md) => console.log("saving " + JSON.stringify(md))}
      />
    </div>
  );
};

export default MappingDefinition;

const GET_MAPPING_DEFINITION = gql`
  query getMappingDefinition($mdId: ID!) {
    mappingDefinition(id: $mdId) {
      id
      srcFileName
      destTableName
    }
  }
`;
