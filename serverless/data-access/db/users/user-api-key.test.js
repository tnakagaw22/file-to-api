'use strict';

const userApiKey = require("./user-api-key");

userApiKey.createSchema('demo1')
.then((schema) => {
    return userSignup.generateApiKey('demo1');
})
.catch((e) => console.log(`failed to create schema, ${e}`));


// userSignup.generateApiKey(schema);