import {IdentifyResult} from "sql-query-identifier/lib/defines"

export type ConnectionType = 'postgresql'

export type ConnectionConfig = {}

export type Connection = {
  id: string
  createdAt: Date
  nickname: string | undefined
  type: ConnectionType
  database: string
  config?: ConnectionConfig
  user: string 
  password: string 
  host: string
  port: string 
  url?: string
}


export type DatabaseColumn = {
  name: string
  type: string
  nullable: boolean
  default: string | null
}

export type Database = {
  tables: {
    name: string
    columns: DatabaseColumn[]
  }[]
}

export type Query = {
  id: string
  createdAt: Date
  connectionId: string
  title: string
  query: string
}

export type QueryDatabaseResult = {
  statement: IdentifyResult
  rows: any | any[]
  rowsAffected?: number | null
  error?: string
  aborted?: boolean
}


export type Config = {
  openaiApiKey?: string
  openaiApiEndpoint?: string
  anthropicApiKey?: string
  anthropicApiEndpoint?: string
  deepseekApiKey?: string
  model?: string
}

export type Column = {
  name: string;
  type: string;
  nullable: boolean;
  default: string | null;
}

export type TableWithColumns = {
  name: string;
  columns: Column[];
}

export type DatabaseSchema = {
  oid: number
  nspname: string
  nspowner: number
  nspacl: null
}

export type ColumnTypeNameMap = Map<
  string,
  Column
>


export interface ColumnDef  {
  column_name: string;
  data_type: string;
  column_default: string | null;
  is_nullable: "YES" | "NO";
  character_maximum_length: number | null;
}

export interface ConstraintDef {
  constraint_name: string;
  constraint_type: string;
  column_name: string;
  foreign_table_name: string;
  foreign_column_name: string;
}