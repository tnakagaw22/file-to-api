'use strict';

const AWS = require('aws-sdk');
const fileType = require('file-type');

const s3 = new AWS.S3();

module.exports.upload = async (event, context) => {
  let request = event.body;

  let base64String = request.base64String;

  let buffer = new Buffer(base64String, 'base64');
  let fileMime = fileType(buffer);

  if (fileMime === null){
    return context.fail('The string supplied is not a file type')
  }

  let params = {
    Bucket: 'tnakagaw-dev-test',
    Key: `test.${fileMime.ext}`,
    Body: buffer
  };

  let key = await s3.putObject(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully! ' + key,
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
