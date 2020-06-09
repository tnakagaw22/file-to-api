import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ButtonSaveMD from "../components/ButtonSaveMD";

const MappingDefinitions = (props) => {
  const [srcFileName, setSrcFileName] = useState("");
  const [destTableName, setDestTableName] = useState("");

  const { loading, error, data: resGetMds } = useQuery(GET_MAPPING_DEFINITIONS);

  const resetInputs = () => {
    setSrcFileName("");
    setDestTableName("");
  };

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
      <ButtonSaveMD
        srcFileName={srcFileName}
        destTableName={destTableName}
        resetInputs={resetInputs}
      />
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
