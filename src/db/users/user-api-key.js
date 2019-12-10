'use strict';

const db = require("..");

const createSchema = async (clientCode) => {
    const schemaName = clientCode.trim().replace(' ', '_');

    // await db.raw(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
    await db.raw(`CREATE SCHEMA ${schemaName}`);

    return schemaName;
};

const saveApiKey = (apiKey, clientCode) => {
    return db('api_keys')
            .insert({
                api_key: apiKey,
                client_code: clientCode
            });
};

const getClientCodeByApiKey = async (apiKey) => {
    await db.from('api_keys')
        .where({ api_key: apiKey })
        .select('client_code');
}

module.exports = {
    createSchema,
    saveApiKey,
    getClientCodeByApiKey
};