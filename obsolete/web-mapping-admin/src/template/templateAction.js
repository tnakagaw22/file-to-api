import axios from 'axios';
import ActionTypes from './templateActionType';

export function loadTemplates(dispatch) {
    dispatch({ actionType: ActionTypes.SHOW_LOADING, payload: true });

    setTimeout(() => {
        dispatch({ actionType: ActionTypes.LOAD_TEMPLATES, payload: templates });
    }, 500);
}

export function loadTemplateDetail(dispatch, templateId) {
    dispatch({ actionType: ActionTypes.SHOW_LOADING, payload: true });

    setTimeout(() => {
        dispatch({ actionType: ActionTypes.LOAD_TEMPLATE_DETAIL, payload: templateDetail });
    }, 500);
}

export function loadTables(dispatch) {
    dispatch({ actionType: ActionTypes.SHOW_LOADING, payload: true });

    setTimeout(() => {
        dispatch({ actionType: ActionTypes.LOAD_DESTTABLES, payload: destTables });
    }, 500);
}

// export function setMappingDestTables(dispatch, selectedTableIds) {
//     dispatch({ actionType: ActionTypes.SET_MAPPING_DESTTABLES, payload: selectedTableIds });
    
// }
const templates = [
    { id: 1, templateName: "buildings From Olr", published: true },
    { id: 2, templateName: "listingsFromOlr", published: false }
];

const templateDetail = {
    templateId: 1,
    templateName: "buildings From Olr",
    published: true,
    columns: [
        { id: 1, destColumnId: 4, destColumnName: 'streetAddr', mappingType: 'Column', mappingValue: 'StreetAddress' },
        { id: 2, destColumnId: 5, destColumnName: 'numOfFloor', mappingType: 'Column', mappingValue: 'FloorCount' },
        { id: 3, destColumnId: 6, destColumnName: 'zipCode', mappingType: 'Rule', mappingValue: '' }
    ]
};

const destTables = [
    { id: 1, tableName: 'listings', columns: [
        {id: 1, columnName: 'mlsNumber', dataType: 'string', required: true},
        {id: 2, columnName: 'source', dataType: 'string', required: true},
        {id: 3, columnName: 'price', dataType: 'decimal', required: true}
    ]},
    { id: 2, tableName: 'buildings', columns: [
        {id: 4, columnName: 'streetAddr', dataType: 'string', required: true},
        {id: 5, columnName: 'zipCode', dataType: 'string', required: true},
        {id: 6, columnName: 'numOfFloor', dataType: 'integer', required: false}
    ]},
    { id: 3, tableName: 'agents', columns: [
        {id: 7, columnName: 'firstName', dataType: 'string', required: true},
        {id: 8, columnName: 'lastName', dataType: 'string', required: true},
        {id: 9, columnName: 'email', dataType: 'string', required: true}
    ]}
];