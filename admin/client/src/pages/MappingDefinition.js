import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import MappingDefinitionForm from "../components/MappingDefinitionForm";
import Error from '../components/Error';

const MappingDefinition = (props) => {
  const { loading, error, data } = useQuery(GET_MAPPING_DEFINITION, {
    variables: { mdId: props.id },
  });

  const [createMappingDefinition, { loading: loading_save, error: error_save }] = useMutation(
    CREATE_MAPPING_DEFINITION
  );

  if (loading || loading_save) return <h2>Loading...</h2>;
  if (error) return <p>ERROR: {error.message}</p>;

  if (!data && !data.mappingDefinition) return <p>Loading..</p>;

  return (
    <div>
      <MappingDefinitionForm
        data={data.mappingDefinition}
        onSave={(md) =>
          createMappingDefinition({
            variables: {
              MappingDefinitionSaveInput: {
                srcFileName: md.srcFileName,
                destTableName: md.destTableName,
              },
            },
          })
        }
      />

      {error_save && (
        <Error message="Error occurred when saving" />
      )}
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

const CREATE_MAPPING_DEFINITION = gql`
  mutation createMappingDefinition(
    $MappingDefinitionSaveInput: MappingDefinitionSaveInput!
  ) {
    createMappingDefinition(newMappingDef: $MappingDefinitionSaveInput) {
      mappingDefinition {
        id
        srcFileName
        destTableName
      }
    }
  }
`;
