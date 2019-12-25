import React from 'react';
import { Dropdown, Form } from 'semantic-ui-react';

import MappingTypeSelection from '../components/MappingTypeSelection';

const TemplateColumnMapping = (props) => {

    return (
        <div>
            <Form>
            <Form.Group widths='equal'>
                    <label>Mapping type</label>
                    <MappingTypeSelection />
               
                    <label>Mapping column</label>
                    <input type='text' />
                </Form.Group>
            </Form>
        </div>
    );
}

export default TemplateColumnMapping;