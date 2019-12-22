import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, Form } from 'semantic-ui-react';

import { TemplateStoreContext } from './templateStore';
import { LoadTemplateDetail } from './templateAction';
import TemplateColumnList from './TemplateColumnList';

const TemplateDetail = (props) => {
    const { templateDetail, dispatch } = useContext(TemplateStoreContext);

    useEffect(() => {
        LoadTemplateDetail(dispatch);
    }, [templateDetail]);

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Table Name</label>
                    {templateDetail.templateName}
                </Form.Field>
                <Form.Field>
                    <label>Published</label>
                    <Checkbox label='Published' checked={templateDetail.published} />
                </Form.Field>
            </Form>

            <TemplateColumnList templateColumns={templateDetail.columns} />
        </div>
    );
}

export default TemplateDetail;