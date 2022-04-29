const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
require("dotenv/config");

const createUniqueFileName = filename => {
  const dotIndex = filename.lastIndexOf('.')
  return `${filename.substring(0, dotIndex)}${uuid()}${filename.substring(
    dotIndex
  )}`
}

const uploadFileToS3 = (file) => {
  const { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, S3_BUCKET } =process.env;
  const config = {
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    endpoint: `https://s3.${REGION}.amazonaws.com`,
  }

  const s3 = new AWS.S3(config)
  const encodedBody = file.fileLocation.split(',')[1]
  const decodedBody = Buffer.from(encodedBody, 'base64')
  const params = {
    Bucket: S3_BUCKET,
    Key: createUniqueFileName(file.fileName),
    Body: decodedBody,
    Metadata: {
      fileName: file.fileName,
      dateTime: new Date().toString(),
    },
  }
  return new Promise(function(resolve, reject) {
    s3.upload(params, function(err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

