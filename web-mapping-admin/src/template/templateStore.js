import React, { createContext, useReducer } from 'react';
import ActionTypes from './templateActionType';

const initialState = {
    loading: true,
    templates: [],
    templateDetail: { },
    destTables: [],
    selectedDestTableIds: [],
    columnMappings: []
};

function reducer(state, action) {
    switch (action.actionType) {
        case ActionTypes.SHOW_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ActionTypes.LOAD_TEMPLATES:

            return {
                ...state,
                loading: false,
                templates: action.payload
            };
        case ActionTypes.LOAD_TEMPLATE_DETAIL:
            return {
                ...state,
                loading: false,
                templateDetail: action.payload
            };
        case ActionTypes.LOAD_DESTTABLES:
            return {
                ...state,
                loading: false,
                destTables: action.payload
            };
        case ActionTypes.SET_MAPPING_DESTTABLES:
            return {
                ...state,
                selectedDestTableIds: action.payload
            }
        default:
            console.log('default reducer');
    }
}

export const TemplateStoreContext = createContext({
    ...initialState,
    dispatch: undefined
});

const TemplateStoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TemplateStoreContext.Provider value={{ ...state, dispatch: dispatch }}>
            {children}
        </TemplateStoreContext.Provider>
    );
}

export default TemplateStoreProvider;