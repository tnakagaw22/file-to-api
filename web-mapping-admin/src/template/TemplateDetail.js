import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import { TemplateStoreContext } from './templateStore';
import { loadTemplateDetail, loadTables, setMappingDestTables } from './templateAction';
import DestTableColumnSelection from '../dest-table/DestTableColumnSelection';
import DestTableMultipleSelection from '../components/DestTableMultipleSelection';
import ColumnMappings from '../components/ColumnMappings';

const TemplateDetail = (props) => {
    let { id } = useParams();
    const { templateDetail, destTables, selectedDestTableIds, dispatch } = useContext(TemplateStoreContext);

    useEffect(() => {
        loadTemplateDetail(dispatch, id);
        loadTables(dispatch);
    }, [templateDetail, destTables]);

    let destTableOptions = destTables.map(destTable => ({ key: destTable.id, text: destTable.tableName, value: destTable.id }));

    let mappingColumns = destTables
        .filter(destTable => selectedDestTableIds.includes(destTable.id))
        .map(destTable => destTable.columns.map(column => ({ ...column, tableName: destTable.tableName })));

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
                onChange={(e, data) => setMappingDestTables(dispatch, data.value)}
                options={destTableOptions}
            />

            <ColumnMappings
                columns={Array.prototype.concat(...mappingColumns)}
            />
        </div>
    );
}

export default TemplateDetail;