import React, { createContext, useReducer } from 'react';
import ActionTypes from './destTableActionType';

const initialState = {
    loading: true,
    destTables: [],
    destTableDetail: { columns: []}
};

function reducer(state, action) {
    switch (action.actionType) {
        case ActionTypes.SHOW_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ActionTypes.LOAD_DESTTABLES:

            return {
                ...state,
                loading: false,
                destTables: action.payload
            };
        case ActionTypes.LOAD_DESTTABLE_DETAIL:
            return {
                ...state,
                loading: false,
                destTableDetail: action.payload
            };

        default:
            console.log('default reducer');

    }
}

export const DestTableStoreContext = createContext({
    ...initialState,
    dispatch: undefined
});

const DestTableStoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DestTableStoreContext.Provider value={{ ...state, dispatch: dispatch }}>
            {children}
        </DestTableStoreContext.Provider>
    );
}

export default DestTableStoreProvider;