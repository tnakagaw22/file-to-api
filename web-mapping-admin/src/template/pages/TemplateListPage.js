import React from 'react';

import TemplateStoreProvider from '../templateStore';
import TemplateList from '../TemplateList';
import TemplateDetail from '../TemplateDetail';

const TemplateListPage = (props) => {
    return (
        <TemplateStoreProvider>
            <TemplateList />
            <TemplateDetail />
        </TemplateStoreProvider>
    );
}

export default TemplateListPage;