'use strict';

const handler = require('./handler');

handler.signup()
.then((res) => console.log(res))
.catch((e) => console.log(e));