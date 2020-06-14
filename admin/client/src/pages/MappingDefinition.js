import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import MappingDefinitionForm from "../components/MappingDefinitionForm";
import FieldMapping from "../components/FieldMapping";
import Error from "../components/Error";

const MappingDefinition = (props) => {
  const { loading, error, data } = useQuery(GET_MAPPING_DEFINITION, {
    variables: { mdId: props.id || 0 },
  });

  const [
    saveMappingDefinition,
    { loading: loading_save, error: error_save },
  ] = useMutation(SAVE_MAPPING_DEFINITION);

  if (loading || loading_save) return <h2>Loading...</h2>;
  if (error) return <p>ERROR: {error.message}</p>;

  if (data && !data.mappingDefinition) {
    data.mappingDefinition = {};
  }

  return (
    <div>
      <MappingDefinitionForm
        data={data.mappingDefinition}
        onSave={(md) =>
          saveMappingDefinition({
            variables: {
              MappingDefinitionSaveInput: {
                id: props.id || null,
                srcFileName: md.srcFileName,
                destTableName: md.destTableName,
              },
            },
          })
        }
      />

      <FieldMapping />

      {error_save && <Error message="Error occurred when saving" />}
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

const SAVE_MAPPING_DEFINITION = gql`
  mutation saveMappingDefinition(
    $MappingDefinitionSaveInput: MappingDefinitionSaveInput!
  ) {
    saveMappingDefinition(mappingDefinition: $MappingDefinitionSaveInput) {
      mappingDefinition {
        id
        srcFileName
        destTableName
      }
    }
  }
`;
