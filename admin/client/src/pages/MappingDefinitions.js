import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const MappingDefinitions = (props) => {
  const [srcFileName, setSrcFileName] = useState("");
  const [destTableName, setDestTableName] = useState("");

  const { loading, error, data: resGetMds } = useQuery(
    GET_MAPPING_DEFINITIONS
  );

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

  const resetInputs = () => {
    setSrcFileName("");
    setDestTableName("");
  };

  const [
    createMappingDefinition,
    { save_loading, save_error },
  ] = useMutation(CREATE_MAPPING_DEFINITION, {
    update: updateCache,
    onCompleted: resetInputs,
  });

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      test from mapping definitions
      {resGetMds.mappingDefinitions.map((def) => (
        <div>
          {def.id}.{def.srcFileName} - {def.destTableName}
        </div>
      ))}
      <input
        type="text"
        name="srcFileName"
        value={srcFileName}
        onChange={(e) => setSrcFileName(e.target.value)}
      />
      <input
        type="text"
        name="destTableName"
        value={destTableName}
        onChange={(e) => setDestTableName(e.target.value)}
      />
      <button
        type="submit"
        onClick={() =>
          createMappingDefinition({
            variables: {
              MappingDefinitionSaveInput: { srcFileName, destTableName },
            },
          })
        }
      >
        Create new mapping def
      </button>
    </div>
  );
};

export default MappingDefinitions;

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
