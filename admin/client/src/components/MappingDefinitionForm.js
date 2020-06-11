import React, { useState  } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

// import ButtonSaveMD from "../components/ButtonSaveMD";

const MappingDefinitionForm = (props) => {
  const [srcFileName, setSrcFileName] = useState(props.data.srcFileName);
  const [destTableName, setDestTableName] = useState(props.data.destTableName);

  return (
    <div>
      test from mapping definition edit
      <form noValidate autoComplete="off">
        <TextField
          id="srcFileName"
          label="Source"
          value={srcFileName}
            onChange={(e) => setSrcFileName(e.target.value)}
        />
        <TextField
          id="destTableName"
          label="Destination"
          value={destTableName}
            onChange={(e) => setDestTableName(e.target.value)}
        />

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.onSave({srcFileName, destTableName})}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MappingDefinitionForm;
