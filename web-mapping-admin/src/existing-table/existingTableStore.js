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
            case ActionTypes.LOAD_EXISTING_ABLES:

                return {
                    ...state,
                    loading: false,
                    existingTables: action.payload
                };
            case ActionTypes.LOAD_DESTTABLES:
                return {
                    ...state,
                    loading: false,
                    mappedDestTables: action.payload
                };
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