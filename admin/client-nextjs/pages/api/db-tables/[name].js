let tables = {
    'dbo.listings': ['id', 'listingKey', 'price'],
    'agents': ['id', 'firstName', 'lastName']
};

export default (req, res) => {

    switch (req.method) {
        case 'GET':
            // Get data from your database
            res.status(200).json(tables[req.query.name])
            break

        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}
