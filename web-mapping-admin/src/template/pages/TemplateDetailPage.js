import React from 'react';

import TemplateStoreProvider from '../templateStore';
import TemplateDetail from '../TemplateDetail';

const TemplateDetailPage = (props) => {
    return (
        <TemplateStoreProvider>
            <TemplateDetail />
        </TemplateStoreProvider>
    );
}

export default TemplateDetailPage;