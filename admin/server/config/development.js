module.exports = {
    port: 5433,
    host: 'host.docker.internal',
    database: 'file-to-api',
    user: 'postgres',
    password: 'postgres',
    awsRegion: 'us-east-1',
    getTablesQueryPG: 'SELECT DISTINCT table_schema, table_name FROM information_schema.tables ORDER BY table_schema, table_name',
    getClientDbColumns: "SELECT table_schema, table_name, column_name, is_nullable = 'YES' as is_required, data_type, character_maximum_length FROM information_schema.columns",
    clientDatabase: {
        databaseType: 'pg',
        port: 5432,
        host: 'localhost',
        database: 'file-to-api',
        user: 'postgres',
        password: 'postgres',
    }
    // clientDatabase: {
    //     databaseType: 'mssql',
    //     port: 1433,
    //     host: 'localhost\\SQLExpress2017',
    //     database: 'PropertyDatabase',
    //     user: 'import-mapper',
    //     password: 'import-mapper',
    // }
};