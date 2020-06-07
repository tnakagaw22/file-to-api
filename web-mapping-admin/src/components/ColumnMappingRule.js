import React from 'react';
import { Input, Icon } from 'semantic-ui-react';

const ColumnMappingRule = (props) => {

 
    let srcColumnName = "Status";
    let destColumnName = "status";

    return (
        <div>
            <h2>Configure mapping rule</h2>

            <div >
                <div>
                If source <Input placeholder='Source field' /> == <Input placeholder='Source value' />
                <Icon link name='plus circle' color='red' />
                </div>
                
                <div>
                    dest '{destColumnName}' = <Input placeholder='Dest value' />
                </div>
            </div>
        </div>
    );
}

export default ColumnMappingRule;