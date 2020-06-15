import React from 'react';

import TemplateStoreProvider from '../templateStore';
import TemplateList from '../TemplateList';

const TemplateListPage = (props) => {
    return (
        <TemplateStoreProvider>
            <TemplateList />
        </TemplateStoreProvider>
    );
}

export default TemplateListPage;