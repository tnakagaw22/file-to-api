import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
// import ButtonSaveMD from "../components/ButtonSaveMD";

const MappingDefinitionForm = (props) => {
  const srcFileName = props.data.srcFileName;
  const destTableName = props.data.destTableName;

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            id="srcFileName"
            label="Source"
            value={srcFileName}
            onChange={(e) =>
              props.onChange({ srcFileName: e.target.value, destTableName })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="destTableName"
            label="Destination"
            value={destTableName}
            onChange={(e) =>
              props.onChange({ srcFileName, destTableName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.onSave({ srcFileName, destTableName })}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MappingDefinitionForm;
