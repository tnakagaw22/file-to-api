import React from 'react';

import DestTableStoreProvider from './DestTableStore';
import DestTable from './DestTable';

const DestTablePage = (props) => {
    return (
        <DestTableStoreProvider>
            <DestTable />
        </DestTableStoreProvider>
    );
}

export default DestTablePage;