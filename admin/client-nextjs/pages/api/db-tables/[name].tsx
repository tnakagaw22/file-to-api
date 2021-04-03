import dbTables from '../../../mock-data/db-tables.json';

export default (req, res) => {
    let tableName = req.query.name.replace('dbo.', '');
    let dbTable = dbTables.filter(dbTable => dbTable.TABLE_NAME === tableName);

    if (dbTable.length <= 0) {
        res.status(404).end(`table ${tableName} was not found.`);
        return;
    }

    switch (req.method) {
        case 'GET':
            // Get data from your database
            res.status(200).json(dbTable[0])
            break

        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}
