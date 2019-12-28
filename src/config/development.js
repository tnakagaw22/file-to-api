module.exports = {
    port: 5432,
    host: 'localhost',
    database: 'file-to-api',
    user: 'postgres',
    password: 'postgres',
    awsRegion: 'us-east-1',
    showTablesQueryPG: 'SELECT tablename, schemaname FROM pg_catalog.pg_tables ORDER BY schemaname, tableName'
};