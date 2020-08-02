export {};
const knex = require('knex');

const getDbContext = (dbParam) => {
    return knex(dbParam);
}

module.exports = {
    getDbContext
}