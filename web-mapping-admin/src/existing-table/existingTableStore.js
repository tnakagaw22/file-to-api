import React, { createContext, useReducer } from 'react';
import produce from 'immer';

import ActionTypes from './existingTableActionType';

const initialState = {
    loading: true,
    existingTables: [],
    mappedDestTables: []
};


const reducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.actionType) {
            case ActionTypes.SHOW_LOADING:
                return {
                    ...state,
                    loading: action.payload
                };
            case ActionTypes.SET_EXISTING_TABLES:
                draft.existingTables = action.payload;
                break;
            case ActionTypes.LOAD_DESTTABLES:
                draft.mappedDestTables = action.payload;
                break;
            case ActionTypes.MAP_TO_DESTTABLE:
                draft.existingTables.push(action.payload);
                draft.mappedDestTables.filter(mappedDestTable => mappedDestTable !== action.payload);
                break;
            case ActionTypes.UNMAP_FROM_DESTTABLE:
                draft.mappedDestTables.push(action.payload);
                draft.existingTables.filter(existingTable => existingTable !== action.payload);
            default:
                console.log('default reducer');
        }
    });

export const ExistingTableStoreContext = createContext({
    ...initialState,
    dispatch: undefined
});

const ExistingTableStoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ExistingTableStoreContext.Provider value={{ ...state, dispatch: dispatch }}>
            {children}
        </ExistingTableStoreContext.Provider>
    );
}

export default ExistingTableStoreProvider;