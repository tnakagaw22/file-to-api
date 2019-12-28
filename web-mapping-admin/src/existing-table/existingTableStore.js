import React, { createContext, useReducer } from 'react';
import produce from 'immer';

import ActionTypes from './existingTableActionType';

const initialState = {
    loading: true,
    notMappedTables: [],
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
                let dedupedNotMappedTables = action.payload.filter(notMappedTable => !state.mappedDestTables.includes(notMappedTable.tableName));
                draft.notMappedTables = dedupedNotMappedTables;
                break;
            case ActionTypes.LOAD_DESTTABLES:
                draft.mappedDestTables = action.payload;
                break;
            case ActionTypes.MAP_TO_DESTTABLE:
                let existingMappedDest = state.mappedDestTables.find(destTable => destTable.name === action.payload.tableName);
                if (existingMappedDest) {
                    console.log('duplicate table: ' +existingMappedDest);
                    return;
                }

                draft.mappedDestTables.push(action.payload);
                draft.notMappedTables.filter(existingTable => existingTable !== action.payload);
                break;
            case ActionTypes.UNMAP_FROM_DESTTABLE:
                draft.notMappedTables.push(action.payload);
                draft.mappedDestTables.filter(mappedDestTable => mappedDestTable !== action.payload);
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