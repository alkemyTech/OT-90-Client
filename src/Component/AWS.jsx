import S3 from 'react-aws-s3';

require('dotenv').config()

const config = {
  bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
  s3Url: process.env.REACT_APP_AWS_S3_URL,
  region: process.env.REACT_APP_AWS_S3_REGION,
  accessKeyId: process.env.REACT_APP_AWS_S3_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET,
}

const ReactS3Client = new S3(config);

function Upload(file, newFileName) {
  ReactS3Client.uploadFile(file, newFileName)
    .then((response) => response)
    .catch((error) => error)
}

function Delete(fileName) {
  ReactS3Client.deleteFile(fileName)
    .then((response) => response)
    .catch((error) => error)
}

export default {
  Upload,
  Delete,
}
