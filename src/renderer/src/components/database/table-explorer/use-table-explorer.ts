import {actionsProxy} from '@/lib/action-proxy';
import {useDatabase} from '@/pages/database/slice/database-slice';
import {useMutation, useQuery} from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, type ColumnDef, flexRender, getPaginationRowModel } from "@tanstack/react-table"
import {useMemo, useState} from 'react'
import {useParams} from 'react-router'

interface TableData {
  [key: string]: any
}

const useTableExplorer = () => {
    const { tableName } = useParams()
    const { selectedSchema} = useDatabase()
    const {connectionId} = useParams();
    const [data, setData] = useState<TableData[]>([])
    const [columnSizing, setColumnSizing] = useState({})

    if (!connectionId) {
        throw new Error('No connection found')
    }

    const { mutateAsync: queryDatabase } = useMutation({
      mutationFn: (input: { connectionId: string; query: string }) => actionsProxy.queryDatabase.invoke(input)
    })

    const fetchTableData = async () => {
      try {
        const res = await queryDatabase({
          connectionId: connectionId,
          query: `SELECT * FROM "${selectedSchema}"."${tableName}"`
        })
      console.log(res)
      setData(res[0].rows || [])
      return res
      } catch (error) {
        console.error('Error fetching table data:', error)
        return []
      }
    }

    // Generate columns based on the first row of data
    const columns = useMemo<ColumnDef<TableData>[]>(() => {
      if (data.length === 0) return []
      
      return Object.keys(data[0]).map((key) => ({
        id: key,
        accessorKey: key,
        header: key,
        cell: (info) => info.getValue(),
        size: 150, // Default column size
        minSize: 10, // Minimum column size
        maxSize: 1000, // Maximum column size
      }))
    }, [data])

    // Table configuration
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      enableColumnResizing: true,
      columnResizeMode: 'onChange',
      onColumnSizingChange: setColumnSizing,
      state: {
        columnSizing,
        pagination: {
          pageSize: 20,
          pageIndex: 0
        }
      },
      defaultColumn: {
        minSize: 60,
        maxSize: 800,
      },
      debugTable: true,
      debugHeaders: true,
      debugColumns: true,
    })

    // Use React Query for data fetching
    const { refetch, isLoading, isFetching } = useQuery({
      queryKey: ['table-data', tableName],
      queryFn: fetchTableData,
      enabled: Boolean(tableName && selectedSchema),
      throwOnError(error, query) {
        console.error('Error fetching table data:', error)
        return false
      },
    })

    return {
      table,
      tableName,
      data,
      isLoading: isLoading || isFetching,
      refetch
    }
}

export default useTableExplorer