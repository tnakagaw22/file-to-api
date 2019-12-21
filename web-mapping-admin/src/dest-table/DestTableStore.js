import React, { createContext, useReducer } from 'react';
import ActionTypes from './DestTableActionType';

const initialState = {
    loading: true,
    destTables: []
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
                destTables: action.payload
            }

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