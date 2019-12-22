import React from 'react';

import DestTableStoreProvider from '../destTableStore';
import DestTable from '../DestTableList';
import DestTableDetail from '../DestTableDetail';

const DestTablePage = (props) => {
    return (
        <DestTableStoreProvider>
            <DestTable />
            <DestTableDetail />
        </DestTableStoreProvider>
    );
}

export default DestTablePage;