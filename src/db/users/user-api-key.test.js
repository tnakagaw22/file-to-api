'use strict';

const userApiKey = require("./user-api-key");

userApiKey.createSchema('dev')
.then((schema) => {
    return userSignup.generateApiKey('dev');
})
.catch((e) => console.log(`failed to create schema, ${e}`));


// userSignup.generateApiKey(schema);