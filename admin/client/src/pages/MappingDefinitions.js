import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";


const MappingDefinitions = (props) => {

  const { loading, error, data: resGetMds } = useQuery(GET_MAPPING_DEFINITIONS);


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
