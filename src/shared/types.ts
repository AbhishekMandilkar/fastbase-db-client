import {IdentifyResult} from "sql-query-identifier/lib/defines"

export type ConnectionType = 'postgresql'

export type ConnectionConfig = {}

export type Connection = {
  id: string
  createdAt: Date
  nickname: string | null
  type: ConnectionType
  database: string
  config?: ConnectionConfig | null
  user?: string | null
  password?: string | null
  host?: string | null
  port?: string | null
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
  rows: Record<string, unknown>[]
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
