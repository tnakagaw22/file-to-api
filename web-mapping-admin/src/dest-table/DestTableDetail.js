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
            <h1>Destination Table - {destTableDetail.tableName}</h1>
            <Form>
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