import React from 'react';

import ExistingTableStoreProvider from '../existingTableStore';
import ExistingTableList from '../ExistingTableList';

const ExistingTableListPage = (props) => {
    return (
        <ExistingTableStoreProvider>
            <ExistingTableList />
        </ExistingTableStoreProvider>
    );
}

export default ExistingTableListPage;