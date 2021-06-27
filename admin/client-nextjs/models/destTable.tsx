import { DestTableColumn } from './destTableColumn'

export interface DestTable {
  schema: string;
  name: string;
  columns: DestTableColumn[];
}