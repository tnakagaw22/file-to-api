import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, Form } from 'semantic-ui-react';

import { DestTableStoreContext } from './destTableStore';
import { LoadDestTableDetail } from './destTableAction';
import DestTableColumnList from './DestTableColumnList';

const DestTableDetail = (props) => {
    const { destTableDetail, dispatch } = useContext(DestTableStoreContext);

    useEffect(() => {
        LoadDestTableDetail(dispatch);
    }, [destTableDetail]);

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Table Name</label>
                    {destTableDetail.tableName}
                </Form.Field>
                <Form.Field>
                    <label>Published</label>
                    <Checkbox label='Published' checked={destTableDetail.published} />
                </Form.Field>
            </Form>

            <DestTableColumnList destTableColumns={destTableDetail.columns} />
        </div>
    );
}

export default DestTableDetail;