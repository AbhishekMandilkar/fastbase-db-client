import {useMemo, useState} from 'react'
import {useTheme} from 'next-themes'
import {QueryDatabaseResult} from 'src/shared/types'
import {useParams} from 'react-router'
import {useReactTable, ColumnDef, getCoreRowModel, getPaginationRowModel} from '@tanstack/react-table'
import useSqlQuery from '../hooks/use-sql-query'

const useSqlEditor = () => {
  const [code, setCode] = useState(`SELECT * FROM users`);
  const [results, setResults] = useState<QueryDatabaseResult[]>([]);
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const {handleQuery, isPending} = useSqlQuery();
  const {connectionId} = useParams();

  if (!connectionId) {
    throw new Error('No active connection')
  }

  const columns = useMemo<ColumnDef<Record<string, unknown>>[]>(() => {
    if (results.length === 0) return []
    
    return Object.keys(results[0]?.rows[0] || {}).map((key) => ({
      id: key,
      accessorKey: key,
      header: key,
      cell: (info) => info.getValue()
    }))
  }, [results])

  const table = useReactTable({
    data: results[0]?.rows || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })


  const handleRunQuery = async (query?: string) => {
    const resp = await handleQuery(query || code)
    console.info(resp)
    setResults(resp);
  }

  return {
    code,
    setCode,
    isDarkMode,
    handleRunQuery,
    isPending,
    results,
    table
  }
}

export default useSqlEditor
