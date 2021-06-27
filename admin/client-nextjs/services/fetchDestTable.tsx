import { DestTable } from '../models/destTable';
import { DestTableColumn } from '../models/destTableColumn';

export const fetchDestTable = async (tableName:string): Promise<DestTable> => {
    const res = await fetch(`http://localhost:4000/api/db-tables/${tableName}`)
    const data = await res.json()

    if (!data.COLUMNS){
      return null;
    }
    
    const destTableColumns: DestTableColumn[] = data.COLUMNS.map(column => {
      return {
        name: column.COLUMN_NAME,
        isRequired: column.IS_NULLABLE === 'NO',
        dataType: column.DATA_TYPE,
      } as DestTableColumn
    });

    const destTable: DestTable = {
      schema: data.TABLE_SCHEMA,
      name: data.TABLE_NAME,
      columns: destTableColumns
    };

  return destTable;
}

export const fetchDestTableNames = async (): Promise<string[]> => {
    const res = await fetch('http://localhost:4000/api/db-tables')
    const data = await res.json()


  return data;
}