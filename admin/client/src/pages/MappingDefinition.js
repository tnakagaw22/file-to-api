import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import MappingDefinitionForm from "../components/MappingDefinitionForm";
import FieldMapping from "../components/FieldMapping";
import Error from "../components/Error";
import useFetch from "../hooks/useFetch";
import { getMappingDefinition, saveMappingDefinition } from "../context/api";
import { GlobalContext } from "../context/GlobalContext";

const MappingDefinition = (props) => {
  const { showNotification } = useContext(GlobalContext);
  const [mappingDefinition, setMappingDefinition, isLoading, error] = useFetch(
    getMappingDefinition,
    props.id || 0
  );
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <p>ERROR: {error}</p>;

  return (
    <div>
      <MappingDefinitionForm
        data={mappingDefinition}
        onSave={async (md) => {
          let savedMapping = await saveMappingDefinition({
            id: props.id || null,
            srcFileName: md.srcFileName,
            destTableName: md.destTableName,
          });
          if (props.id) {
            showNotification(`Mappping ${props.id} has been saved`);
          } else {
            showNotification(`Mappping ${savedMapping.id} has been added`);
            navigate(`/mapping-definition/${savedMapping.id}`);
          }
        }}
      />

      <FieldMapping fieldMappings={mappingDefinition.fieldMappings || []} />

      {/* {error_save && <Error message="Error occurred when saving" />} */}
    </div>
  );
};

export default MappingDefinition;
