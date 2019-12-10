'use strict';

const stream = require('stream');
const readline = require('readline');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const create = async (bucket, key, data) => {
    let params = {
        Bucket: bucket,
        Key: key,
        Body: data
    };

    await s3.putObject(params).promise();
};

const read = (bucket, key) => {
    let params = {
        Bucket: bucket,
        Key: key
    };
    const input = s3
        .getObject(params)
        .createReadStream()

    // node readline with stream
    return readline
        .createInterface({
            input,
            terminal: false
        })
};

module.exports = {
    create,
    read
}