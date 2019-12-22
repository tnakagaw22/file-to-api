import axios from 'axios';
import ActionTypes from './destTableActionType';

export function LoadDestTables(dispatch) {
    dispatch({ actionType: ActionTypes.SHOW_LOADING, payload: true });

    setTimeout(() => {
        dispatch({ actionType: ActionTypes.LOAD_DESTTABLES, payload: destTables });
    }, 2000);
}
export function LoadDestTableDetail(dispatch, destTableId) {
    dispatch({ actionType: ActionTypes.SHOW_LOADING, payload: true });

    setTimeout(() => {
        dispatch({ actionType: ActionTypes.LOAD_DESTTABLE_DETAIL, payload: destTableDetail });
    }, 2000);
}

const destTables = [
    { id: 1, name: "buildings", published: true },
    { id: 2, name: "listings", published: false }
];

const destTableDetail = {
    destTableId: 1,
    tableName: "buildings",
    published: true,
    columns: [
        { id: 1, columnName: 'streetAddr', dataType: 'string', required: true },
        { id: 2, columnName: 'numOfFloor', dataType: 'integer', required: false },
        { id: 3, columnName: 'zipCode', dataType: 'string', required: true }
    ]
};
