import React from 'react';

import TemplateStoreProvider from '../templateStore';
import TemplateColumnMapping from '../TemplateColumnMapping';

const TemplateColumnMappingPage = (props) => {
    return (
        <TemplateStoreProvider>
            <TemplateColumnMapping />
        </TemplateStoreProvider>
    );
}

export default TemplateColumnMappingPage;