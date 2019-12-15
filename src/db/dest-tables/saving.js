'use strict';

const db = require("../");

const bulkInsert = async (clientCode, tableName, savingData) => {
    await db(tableName).withSchema(clientCode)
        .insert(savingData);
}
module.exports = {
    bulkInsert
};