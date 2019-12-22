import axios from 'axios';
import ActionTypes from './templateActionType';

export function LoadTemplates(dispatch) {
    dispatch({ actionType: ActionTypes.SHOW_LOADING, payload: true });

    setTimeout(() => {
        dispatch({ actionType: ActionTypes.LOAD_TEMPLATES, payload: templates });
    }, 2000);
}
export function LoadTemplateDetail(dispatch, templateId) {
    dispatch({ actionType: ActionTypes.SHOW_LOADING, payload: true });

    setTimeout(() => {
        dispatch({ actionType: ActionTypes.LOAD_TEMPLATE_DETAIL, payload: templateDetail });
    }, 2000);
}

const templates = [
    { id: 1, templateName: "buildings From Olr", published: true },
    { id: 2, templateName: "listingsFromOlr", published: false }
];

const templateDetail = {
    templateId: 1,
    templateName: "buildings From Olr",
    published: true,
    columns: [
        { id: 1, destColumnId: 1, destColumnName: 'streetAddr', mappingType: 'Column', mappingValue: 'StreetAddress' },
        { id: 2, destColumnId: 2, destColumnName: 'numOfFloor', mappingType: 'Column', mappingValue: 'FloorCount' },
        { id: 3, destColumnId: 3, destColumnName: 'zipCode', mappingType: 'Rule', mappingValue: '' }
    ]
};
