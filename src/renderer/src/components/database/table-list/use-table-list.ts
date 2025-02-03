import { actionsProxy } from '@/lib/action-proxy'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useState, useMemo } from 'react'
import { useParams } from 'react-router'
import {TableWithColumns} from 'src/shared/types'
import { useDebounce } from '@/hooks/use-debounce'

export const useTableList = () => {
  const { connectionId, tableName } = useParams();
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  
  const query = useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(connectionId),
    queryKey: ['databaseTables', connectionId],
    queryFn: async () => {
      if (!connectionId) return null
      return actionsProxy.connectDatabase.invoke({ connectionId }).then((connection) => {
        if (!connection) {
          throw new Error('database not found')
        }

        return actionsProxy.getDatabaseSchema.invoke({ connection })
      })
    },
  });


  const filteredTables = useMemo(() => {
    if (!query.data?.tables || !debouncedSearch) return query.data?.tables
    return query.data.tables.filter(table => 
      table.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [query.data?.tables, debouncedSearch])

  return {
    tables: filteredTables as TableWithColumns[],
    isFreshLoading: query.isLoading,
    isCachedLoading: query.isFetching,
    selectedTable: tableName,
    setSearch
  }
}
