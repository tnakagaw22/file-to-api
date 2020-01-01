const clientDb = require("./db-config");
const config = require("../../config/");


const getTables = () => {
    return clientDb.raw(config.getTablesQueryPG).then(data => data.rows);
};

const getColumns = (table_schema, table_name) => {
    let query = `${config.getClientDbColumns} where table_schema = '${table_schema}' and table_name = '${table_name}'`;
    return clientDb.raw(query).then(data => data.rows);
}

module.exports = {
    getTables,
    getColumns
};