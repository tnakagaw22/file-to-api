import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import useQueryString from "../hooks/useQueryString";
import { TemplateStoreContext } from './templateStore';
import { loadTemplateDetail, loadTables, setMappingDestTables } from './templateAction';
import DestTableColumnSelection from '../dest-table/DestTableColumnSelection';
import DestTableMultipleSelection from '../components/DestTableMultipleSelection';
import ColumnMappings from '../components/ColumnMappings';

const TemplateDetail = (props) => {
    let { id } = useParams();
    const [destTableIds, onSetValue] = useQueryString("destTableIds");
    const { templateDetail, destTables, dispatch } = useContext(TemplateStoreContext);

    useEffect(() => {
        loadTemplateDetail(dispatch, id);
        loadTables(dispatch);
    }, [templateDetail, destTables]);

    let destTableOptions = destTables.map(destTable => ({ key: destTable.id, text: destTable.tableName, value: destTable.id }));

    let selectedDestTableIds = [];
    if (Array.isArray(destTableIds)) {
        selectedDestTableIds = destTableIds.map(destTableId => parseInt(destTableId));
    } else if (destTableIds) {
        selectedDestTableIds = [parseInt(destTableIds)];
    }
    
    let mappingColumns = destTables
        .filter(destTable => selectedDestTableIds.includes(destTable.id))
        .map(destTable => destTable.columns.map(column => ({ ...column, tableName: destTable.tableName, templateId: id })));

    return (
        <div>
            <h1>Template - {templateDetail.templateName}</h1>
            <Form>
                <Form.Field>
                    <label>Published</label>
                    <Checkbox label='Published' checked={templateDetail.published} />
                </Form.Field>
            </Form>

            {/* <TemplateColumnList templateColumns={templateDetail.columns} /> */}
            {/* <DestTableColumnSelection /> */}
            <DestTableMultipleSelection
                onChange={(e, data) => {
                    // setMappingDestTables(dispatch, data.value);
                    onSetValue(data.value);
                }}
                options={destTableOptions}
                defaultValue={selectedDestTableIds}
            />

            <ColumnMappings
                columns={Array.prototype.concat(...mappingColumns)}
            />
        </div>
    );
}

export default TemplateDetail;