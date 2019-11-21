'use strict';

const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports.upload = async (event, context) => {

  let contentType = event.headers["Content-Type"];
  if (contentType !== "text/csv" && contentType !== "text/tab-separated-values" && contentType !== "text/tsv") {
    return {
      statusCode: 415,
      body: `Content-Type ${contentType} is not supported.`
    }
  }

  let params = {
    Bucket: 'tnakagaw-dev-test',
    Key: `test.txt`,
    Body: event.body
  };

  let key = await s3.putObject(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'File is uploaed successfully. It will be processed shortly'
      },
      null,
      2
    ),
  };

};
