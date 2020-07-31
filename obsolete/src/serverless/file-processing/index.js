'use strict';

var { process } = require('./handler');

let event = {
    inputBucket: 'file-to-process',
    inputKey: 'test.txt'
}
process(event, '')