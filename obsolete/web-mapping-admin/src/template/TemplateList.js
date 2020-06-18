import React, { useContext, useState, useEffect } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import { TemplateStoreContext } from './templateStore';
import { loadTemplates } from './templateAction';

const Template = (props) => {
    const { templates, dispatch } = useContext(TemplateStoreContext);

    useEffect(() => {
        loadTemplates(dispatch);
    }, [templates]);

    let rows = templates.map((template => {
        let publishedCell = template.published ? <Icon color='green' name='checkmark' size='large' /> : '';

        return (
            <Table.Row key={template.id}>
                <Table.Cell collapsing>
                    <Link to={`/temp/${template.id}`}>
                    <Icon link name='edit' />
                    </Link>
                </Table.Cell>
                <Table.Cell>{template.templateName}</Table.Cell>
                <Table.Cell>{publishedCell}</Table.Cell>
            </Table.Row>
        )
    }));

    return (
        <div>
            <h1>Template</h1>
            <Table striped sortable fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Published</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        </div>
    );
}

export default Template;