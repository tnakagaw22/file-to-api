import ActionTypes from './existingTableActionType';

export function setExistingTables(dispatch, existingTables) {
    dispatch({ actionType: ActionTypes.SET_EXISTING_TABLES, payload: existingTables });
}

export function mapToDestTable(dispatch, table) {
    dispatch({ actionType: ActionTypes.MAP_TO_DESTTABLE, payload: table });
}

export function unmapFromDestTable(dispatch, table) {
    dispatch({ actionType: ActionTypes.UNMAP_FROM_DESTTABLE, payload: table });
}


const existingTables = [
    {
        id: 1, schemaName: "dev", tableName: "buildings", columns: [
            { name: 'id' },
            { name: 'streetAddress' },
            { name: 'postalCode' }
        ]
    },
    {
        id: 2, schemaName: "dev", tableName: "listings", columns: [
            { name: 'id' },
            { name: 'buildingId' },
            { name: 'listingType' },
            { name: 'price' },
            { name: 'status' }
        ]
    }
];
