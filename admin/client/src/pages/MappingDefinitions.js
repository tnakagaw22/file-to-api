import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const MappingDefinitions = (props) => {
  const { loading, error, data } = useQuery(GET_MAPPING_DEFINITIONS);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <div>
      test from mapping definitions
      {data.mappingDefinitions.map((def) => (
        <div>
          {def.id}
          {def.srcFileName}
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
    }
  }
`;
