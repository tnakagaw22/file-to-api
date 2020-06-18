import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import TemplateStoreProvider from '../templateStore';
import TemplateDetail from '../TemplateDetail';
import DestTableSelection from '../../components/DestTableSelection';
import destTablesWithColumns from '../../graphql/queries/destTablesWithColumns';

const TemplateDetailPage = (props) => {
    const { loading: destTablesWithColumnsLoading, error: destTablesWithColumnsError, data: destTablesWithColumnsData } = useQuery(destTablesWithColumns, {
        variables: { schema: 'dev' }
    });

    // load templateColumns from graphql
    // create local state to list ColumnMappings
    // complete ColumnMappings using destTablesWithColumnsData
    let test = 'loading';


    if (destTablesWithColumnsData && destTablesWithColumnsData.destTables) {
        test = 'loaded !!!';
    }

    return (
        <TemplateStoreProvider>
            {destTablesWithColumnsLoading && <p>Loading...</p>}
            {destTablesWithColumnsError && <p>Error...</p>}

            {test}
            {/* {destTablesWithColumnsData &&
            destTablesWithColumnsData.destTables.map(destTable => ({ key: destTable.id, text: destTable.tableName, value: destTable.id }))
            } */}
            <TemplateDetail />
        </TemplateStoreProvider>
    );
}

export default TemplateDetailPage;