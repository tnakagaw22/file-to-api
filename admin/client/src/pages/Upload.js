import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { uploadFile } from "../context/api";

const Upload = (props) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      var formData = new FormData();
      formData.append("file", file);


      uploadFile(formData);
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
};

export default Upload;
