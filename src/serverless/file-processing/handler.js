'use strict';

var { read } = require('../data-access/file-io/s3-handler');

module.exports.process = async (event, context) => {
    let mappedValues = [];
    const readStream = read(event.inputBucket, event.inputKey);
    readStream.on('line', line => {
        if (!line) {
            return readStream.close();
        } else {
            // map field, run rule, add mapped obj to list
            console.log(line);
        }
    });

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'File is mapped and saved to db. ' + mappedValues
            },
            null,
            2
        ),
    };

};
