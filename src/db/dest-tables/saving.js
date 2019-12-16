'use strict';

const _ = require('lodash');
const db = require("../");
const { getIdentifiers } = require('./table-def')
const { getDestTableName } = require("../templates/template-column");

const bulkInsert = async (clientCode, tableName, savingData) => {
    console.log(`inserting ${JSON.stringify(savingData)}`);

    await db(tableName).withSchema(clientCode)
        .insert(savingData);
}

const update = async (clientCode, tableName, savingData) => {

    let updatePromises = [];
    savingData.forEach(savingRecord => {
        console.log(savingRecord);

        let updatePromise = db(tableName).withSchema(clientCode)
            .where({ id: savingRecord.id })
            .update(savingRecord);
        updatePromises.push(updatePromise);
    })

    await Promise.all(updatePromises);
}

const save = async (clientCode, tableId, savingData) => {
    let identifiers = await getIdentifiers(clientCode, tableId);
    let destTableName = await getDestTableName(clientCode, tableId);

    let getExistings = db(`${destTableName.table_name}`).withSchema(clientCode);

    let savingDataByKey = {};
    savingData.forEach(savingRecord => {
        let key = _.pick(savingRecord, identifiers.identifiers);
        getExistings.orWhere(key);

        savingDataByKey[Object.values(key).join('-')] = savingRecord;
    });

    let existings = await getExistings;

    let updatingRecords = [];
    existings.forEach(existing => {
        let identifier = _.pick(existing, identifiers.identifiers);
        let key = Object.values(identifier).join('-');

        if (key in savingDataByKey) {
            // if all the valeus are same, no need to update. just delete
            savingDataByKey[key].id = existing.id;
            updatingRecords.push(savingDataByKey[key]);
            
            delete savingDataByKey[key];
        }
    })

    bulkInsert(clientCode, destTableName.table_name, _.values(savingDataByKey));
    update(clientCode, destTableName.table_name, _.values(updatingRecords));
}

module.exports = {
    bulkInsert,
    save
};