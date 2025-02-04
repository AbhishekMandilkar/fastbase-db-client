import AppHeader from '@/components/app-header'
import MainView from '@/components/main-view-wrapper'
import React from 'react'
import useTableExplorer from './use-table-explorer'
import { DataTable } from './data-table/data-table'
import { useDatabase } from '@/pages/database/slice/database-slice'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon } from 'lucide-react'

const TableExplorer = () => {
  const { table, tableName, data, isLoading } = useTableExplorer()
  const { selectedTableConfig } = useDatabase()
  const isEmpty = data.length === 0
  return (
    <MainView className='flex flex-col flex-1'>
      <AppHeader title={tableName || ''} titleClassName="font-mono" />
      {isEmpty ? (
        <div className="flex items-center justify-center h-full mx-auto w-1/2">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>No data found</AlertTitle>
            <AlertDescription>The table is empty.</AlertDescription>
          </Alert>
        </div>
      ) : (
        <ScrollArea className="flex-1 broder max-h-full">
            <DataTable table={table} isLoading={isLoading} />
        </ScrollArea>
      )}
    </MainView>
  )
}

export default TableExplorer
