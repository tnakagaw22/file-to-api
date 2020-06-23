import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

Upload.propTypes = {
    onDrop: PropTypes.func
};

function Upload(props) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      var formData = new FormData();
      formData.append("file", file);

      props.onDrop(formData);
    }, []);
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default Upload;
