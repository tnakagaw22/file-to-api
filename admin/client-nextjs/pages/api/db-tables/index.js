import dbTables from '../../../mock-data/db-tables.json'; 

export default (req, res) => {
    const tableNames = dbTables.map((dbTable) => `${dbTable.TABLE_SCHEMA}.${dbTable.TABLE_NAME}`);

    res.status(200).json(tableNames)
  }
  

//   SELECT t.TABLE_SCHEMA, t.TABLE_NAME, c.COLUMN_NAME, c.IS_NULLABLE, c.COLUMN_DEFAULT, c.DATA_TYPE, c.CHARACTER_MAXIMUM_LENGTH
//   FROM INFORMATION_SCHEMA.TABLES t
//   INNER JOIN INFORMATION_SCHEMA.COLUMNS c ON t.TABLE_SCHEMA = c.TABLE_SCHEMA AND t.TABLE_NAME = c.TABLE_NAME
//   --WHERE t.TABLE_SCHEMA = 'dbo' and t.TABLE_NAME = 'BuildingUnits'
//    WHERE t.TABLE_TYPE = 'BASE TABLE'
//   FOR JSON AUTO