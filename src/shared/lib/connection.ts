import fs from 'fs'
import { identify } from 'sql-query-identifier'
import { eq } from 'drizzle-orm'
import { Connection, DatabaseColumn, DatabaseSchema, QueryDatabaseResult, TableWithColumns } from '../types'
import { appDB, appSchema } from './app-db'
import pg from 'pg'

type DatabaseInstance = {
  execute<T extends Record<string, unknown> = Record<string, unknown>>(
    query: string,
    variables?: any[]
  ): Promise<{
    rows: T[]
    rowsAffected?: number | null
  }>

  close(): Promise<void>
}
const instances = new Map<string, DatabaseInstance>()

export const disconnectDatabase = async (connectionId: string) => {
  const instance = instances.get(connectionId)
  if (instance) {
    await instance.close()
    instances.delete(connectionId)
  }
}

export const connectDatabase = async (connectionId: string, disabledSSL?: boolean) => {
  const connection = await appDB.query.connection.findFirst({
    where: eq(appSchema.connection.id, connectionId)
  })

  if (!connection) {
    return null
  }

  if (instances.has(connection.id)) {
    return connection
  }

  const client = new pg.Client({
    host: connection.host || '127.0.0.1',
    port: connection.port ? Number(connection.port) : 5432,
    user: connection.user ?? '',
    password: connection.password ?? '',
    database: connection.database,
    ssl: disabledSSL
      ? false
      : {
          rejectUnauthorized: false,
          ca: fs.readFileSync('/etc/ssl/cert.pem')
        }
  })

  try {
    await client.connect()
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('The server does not support SSL connections')
    ) {
      return connectDatabase(connectionId, true)
    }
    throw error
  }

  client.on('end', () => {
    instances.delete(connection.id)
  })

  const db = {
    async execute(query, variables) {
      const result = await client.query(query, variables)
      return { rows: result.rows, rowsAffected: result.rowCount }
    },

    async close() {
      await client.end()
    }
  }

  instances.set(connection.id, db)

  return connection
}

export const queryDatabase = async ({
  connectionId,
  query
}: {
  connectionId: string
  query: string
}) => {
  const db = instances.get(connectionId)

  const statements = identify(query)

  const results: QueryDatabaseResult[] = statements.map((statement) => {
    return { statement, rows: [] }
  })

  let hasError = false
  for (const result of results) {
    if (hasError) {
      result.aborted = true
      continue
    }
    try {
      if (!db) {
        throw new Error('No active connection to the database')
      }

      const dbResult = await db.execute(result.statement.text)
      result.rows = dbResult.rows
      result.rowsAffected = dbResult.rowsAffected
    } catch (error) {
      hasError = true
      console.error(error)
      result.error =
        error instanceof Error ? error.message : typeof error === 'string' ? error : 'Unknown error'
    }
  }

  return results
}

export const getDatabaseSchemas = async ({
  connection
}: {
  connection: Connection
}): Promise<DatabaseSchema[]> => {
  const db = instances.get(connection.id)

  if (!db) {
    throw new Error('Database not found')
  }

  const schemas = await db.execute(`SELECT nspname FROM pg_namespace;`);
  const result = schemas.rows as DatabaseSchema[];

  return result;
}

export const getDatabaseTables = async ({
  connectionId,
  schema = 'public'
}: {
  connectionId: string,
  schema?: string
}): Promise<{
  tables: TableWithColumns[]
}> => {
  const db = instances.get(connectionId)

  if (!db) {
    throw new Error('Database not found')
  }

  const tables = await db
    .execute<{
      table_name: string
    }>(`SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = '${schema}';`)
    .then((res) => res.rows)

  const tablesWithColumns = await Promise.all(
    tables.map(async (table) => {
      const columns = await db
        .execute<{
          column_name: string
          data_type: string
          is_nullable: string
          column_default: string | null
        }>(
          `SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = '${table.table_name}';`
        )
        .then((res) => {
          return res.rows.map((row) => {
            return {
              name: row.column_name,
              type: row.data_type,
              nullable: row.is_nullable === 'YES',
              default: row.column_default
            } satisfies DatabaseColumn
          })
        })
      return { name: table.table_name, columns }
    })
  )

  return {
    tables: tablesWithColumns
  }
}