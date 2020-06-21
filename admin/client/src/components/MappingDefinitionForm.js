import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

// import ButtonSaveMD from "../components/ButtonSaveMD";

const MappingDefinitionForm = (props) => {
  const srcFileName = props.data.srcFileName;
  const destTableName = props.data.destTableName;

  return (
    <div>
      test from mapping definition edit
      <form noValidate autoComplete="off">
        <TextField
          id="srcFileName"
          label="Source"
          value={srcFileName}
          onChange={(e) =>
            props.onChange({ srcFileName: e.target.value, destTableName })
          }
        />
        <TextField
          id="destTableName"
          label="Destination"
          value={destTableName}
          onChange={(e) =>
            props.onChange({ srcFileName, destTableName: e.target.value })
          }
        />

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.onSave({ srcFileName, destTableName })}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MappingDefinitionForm;
