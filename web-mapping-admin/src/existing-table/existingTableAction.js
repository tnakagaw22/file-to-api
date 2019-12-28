import ActionTypes from './existingTableActionType';

export function loadExistingTables(dispatch) {
    dispatch({ actionType: ActionTypes.SHOW_LOADING, payload: true });

    setTimeout(() => {
        dispatch({ actionType: ActionTypes.LOAD_EXISTING_ABLES, payload: existingTables });
    }, 500);
}

export function mapToDestTable(dispatch, table) {
    dispatch({ actionType: ActionTypes.MAP_TO_DESTTABLE, payload: table });
}

export function unmapFromDestTable(dispatch, table) {
    dispatch({ actionType: ActionTypes.UNMAP_FROM_DESTTABLE, payload: table });
}


const existingTables = [
    {
        id: 1, name: "buildings", columns: [
            { name: 'id' },
            { name: 'streetAddress' },
            { name: 'postalCode' }
        ]
    },
    {
        id: 2, name: "listings", columns: [
            { name: 'id' },
            { name: 'buildingId' },
            { name: 'listingType' },
            { name: 'price' },
            { name: 'status' }
        ]
    }
];
