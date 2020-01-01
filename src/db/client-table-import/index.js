const { getColumns } = require("../client-tables");
const { insertDestTableColumns } = require('../dest-tables/table-def');

const importClientTableColumns = async (clientSchema, clientTableName) => {
    const clientColumns = await getColumns(clientSchema, clientTableName);
    const columnDefsToSave = clientColumns.map(columnInfo => {
        return {
            columnName: columnInfo.column_name,
            dataType: columnInfo.data_type,
            required: columnInfo.is_required
        }
    });

    const destSchema = 'dev';
    const insertDestResult = await insertDestTableColumns(destSchema, clientTableName, columnDefsToSave);

    return {
        source: {
            schema: clientSchema,
            name: clientTableName
        },
        dest: {
            id: insertDestResult.tableId,
            schema: destSchema,
            name: insertDestResult.tableName
        }
    }
};

module.exports = {
    importClientTableColumns
};