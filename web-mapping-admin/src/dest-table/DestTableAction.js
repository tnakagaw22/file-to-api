import axios from 'axios';
import ActionTypes from './DestTableActionType';

export function LoadDestTables(dispatch) {
    dispatch({ actionType: ActionTypes.SHOW_LOADING, payload: true });

    setTimeout(() => {
        dispatch({ actionType: ActionTypes.LOAD_DESTTABLES, payload: data });
    }, 2000);
}

const data = [
    { id: 1, name: "buildings", published: true },
    { id: 2, name: "listings", published: false }
];
