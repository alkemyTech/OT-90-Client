import React, { useRef } from 'react';

import { Button } from 'react-bootstrap';

import S3 from 'react-aws-s3';

function Upload() {
  const fileInput = useRef();

  const handleClick = (event) => {
    event.preventDefault();
    const file = fileInput.current.files[0];
    const newFileName = fileInput.current.files[0].name;
    const config = {
      buckname: process.env.REACT_APP_DIR_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccess_KEYREACT: process.env,
    }
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName)
  }
  return (
    <>
      <form onSubmit={handleClick}>
        Ingresar archivo:
        <br />
        <br />
        <input type="file" ref={fileInput} />
        <br />
        <br />
        <Button type="submit">Aceptar</Button>
      </form>
    </>
  )
}

export default Upload;
