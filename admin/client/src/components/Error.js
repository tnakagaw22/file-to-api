import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import PropTypes from "prop-types";

Error.propTypes = {
    message: PropTypes.string
};

function Error(props) {
    let message = 'Error occurred.'

    if (props.message){
        message = props.message;
    }
    
  return (
    <div>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </div>
  );
}

export default Error;
