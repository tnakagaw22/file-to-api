'use strict';

const userApiKey = require('../../db/users/user-api-key');
const { generateApiKey } = require('./api-gateway');

const signup = async (clientName) => {
    try {

        let clientCode = await userApiKey.createSchema(clientName);
        console.log(`schema ${clientCode} is created`);

        let apiKey = await generateApiKey(clientCode);
        await userApiKey.saveApiKey(apiKey, clientCode);

    } catch (error) {
        console.log(`failed to create client ${clientName}: ${error}`);
        throw( error );
    }
}

module.exports = {
    signup
};