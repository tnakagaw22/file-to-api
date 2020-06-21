import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import MappingDefinitionForm from "../components/MappingDefinitionForm";
import FieldMappings from "../components/FieldMappings";
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

  const onChangeFieldMapping = (updatedFieldMappings) => {
    setMappingDefinition({
      srcFileName: mappingDefinition.srcFileName,
      destTableName: mappingDefinition.destTableName,
      fieldMappings: updatedFieldMappings,
    });
  };

  const onAddFieldMapping = () => {
    const { destFieldName, destRequired, value } = {};
    const { srcFileName, destTableName } = mappingDefinition;
    const fieldMappings = mappingDefinition.fieldMappings;
    fieldMappings.push({ destFieldName, destRequired, value });

    setMappingDefinition({ srcFileName, destTableName, fieldMappings });
  };

  const onDeleteFieldMapping = (updatedFieldMappings) => {
    const { srcFileName, destTableName } = mappingDefinition;
    const fieldMappings = updatedFieldMappings;
    setMappingDefinition({ srcFileName, destTableName, fieldMappings });
  };

  const onChangeMappingDefinition = (updatedMd) => {
    const { srcFileName, destTableName } = updatedMd;
    const fieldMappings = mappingDefinition.fieldMappings;
    setMappingDefinition({ srcFileName, destTableName, fieldMappings });
  };

  const onSave = async (md) => {
    const { srcFileName, destTableName, fieldMappings } = mappingDefinition;
    let savedMapping = await saveMappingDefinition({
      id: props.id || null,
      srcFileName,
      destTableName,
      fieldMappings,
    });
    if (props.id) {
      showNotification(`Mappping ${props.id} has been saved`);
    } else {
      showNotification(`Mappping ${savedMapping.id} has been added`);
      navigate(`/mapping-definition/${savedMapping.id}`);
    }
  };

  return (
    <div>
      <MappingDefinitionForm
        data={mappingDefinition}
        onChange={onChangeMappingDefinition}
        onSave={onSave}
      />

      <FieldMappings
        fieldMappings={mappingDefinition.fieldMappings || []}
        onChange={onChangeFieldMapping}
        onAdd={onAddFieldMapping}
        onDelete={onDeleteFieldMapping}
      />

      {/* {error_save && <Error message="Error occurred when saving" />} */}
    </div>
  );
};

export default MappingDefinition;
