import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import ButtonSaveMD from "../components/ButtonSaveMD";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
const MappingDefinition = (props) => {
  const [srcFileName, setSrcFileName] = useState("");
  const [destTableName, setDestTableName] = useState("");

  const classes = useStyles();

  const resetInputs = () => {
    setSrcFileName("");
    setDestTableName("");
  };

  return (
    <div>
      test from mapping definition edit
      <form className={classes.root} noValidate autoComplete="off">
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

        <ButtonSaveMD
          srcFileName={srcFileName}
          destTableName={destTableName}
          resetInputs={resetInputs}
        />
      </form>
    </div>
  );
};

export default MappingDefinition;
