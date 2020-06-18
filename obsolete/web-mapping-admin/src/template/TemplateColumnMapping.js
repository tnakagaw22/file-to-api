import React from 'react';
import { Form } from 'semantic-ui-react';

import useQueryString from "../hooks/useQueryString";
import MappingTypeSelection from '../components/MappingTypeSelection';
import ColumnMappingRule from '../components/ColumnMappingRule'

const TemplateColumnMapping = (props) => {
    const [mappingType, setMappingType] = useQueryString("mappingType");

    const displaySourceColumnName = mappingType === 'column';
    const displayRuleConfig = mappingType === 'rule';

    return (
        <div>
            <Form>
                <Form.Group >
                    <MappingTypeSelection
                        onChange={(e, data) => {
                            setMappingType(data.value);
                        }}
                        defaultValue={mappingType}
                        required
                    />

                    {displaySourceColumnName &&
                        <Form.Input
                            label='Source column name'
                            width={6}
                        />
                    }

                </Form.Group>
                <Form.Group >
                    {displayRuleConfig &&
                        <ColumnMappingRule
                        />
                    }
                </Form.Group>
            </Form>
        </div>
    );
}

export default TemplateColumnMapping;