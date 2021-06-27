import React, { useState } from "react";
import { Button } from '@material-ui/core';


const ButtonSaveMD = (props) => {
  const updateCache = (cache, { data }) => {
    // Fetch the todos from the cache
    const existings = cache.readQuery({
      query: GET_MAPPING_DEFINITIONS,
    });

    // Add the new todo to the cache
    const newMappingDefinition = data.createMappingDefinition.mappingDefinition;
    cache.writeQuery({
      query: GET_MAPPING_DEFINITIONS,
      data: {
        mappingDefinitions: [
          ...existings.mappingDefinitions,
          newMappingDefinition,
        ],
      },
    });
  };

  const [createMappingDefinition, { loading, error }] = useMutation(
    CREATE_MAPPING_DEFINITION,
    {
      update: updateCache,
      onCompleted: props.resetInputs,
    }
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      <Button variant="contained" color="primary"
      onClick={() =>
        createMappingDefinition({
          variables: {
            MappingDefinitionSaveInput: {
              srcFileName: props.srcFileName,
              destTableName: props.destTableName,
            },
          },
        })
      }>
  Create new mapping def
</Button>
    </div>
  );
};

export default ButtonSaveMD;

const GET_MAPPING_DEFINITIONS = gql`
  query {
    mappingDefinitions {
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
