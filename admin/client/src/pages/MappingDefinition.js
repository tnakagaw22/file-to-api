import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import MappingDefinitionForm from "../components/MappingDefinitionForm";
import FieldMapping from "../components/FieldMapping";
import Error from "../components/Error";
import useFetch from "../hooks/useFetch";
import { getMappingDefinition, saveMappingDefinition } from "../context/api";

const MappingDefinition = (props) => {
  const [mappingsDefinition, isLoading, error] = useFetch(getMappingDefinition, props.id || 0);
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <p>ERROR: {error}</p>;

  return (
    <div>
      <MappingDefinitionForm
        data={mappingsDefinition}
        onSave={(md) =>
          saveMappingDefinition({
            id: props.id || null,
            srcFileName: md.srcFileName,
            destTableName: md.destTableName,
          })
        }
      />

      <FieldMapping
      fieldMappings={mappingsDefinition.fieldMappings || []} />

      {/* {error_save && <Error message="Error occurred when saving" />} */}
    </div>
  );
};

export default MappingDefinition;