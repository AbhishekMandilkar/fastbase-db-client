import AppHeader from '@/components/app-header'
import useTableExplorer from './use-table-explorer'
import {DataTable} from './data-table/data-table'
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import {InfoIcon, Rows3Icon, Table} from 'lucide-react'
import TableActionView from './table-actions/table-right-action-view'
import {Skeleton} from '@/components/ui/skeleton'

enum tabs {
  rows = 'rows',
  structure = 'structure'
}

const tableExplorerTabs = [
  { value: tabs.rows, title: 'Rows', icon: Rows3Icon },
  { value: tabs.structure, title: 'Structure', icon: Table }
]

const TableExplorer = () => {
  const { table, tableName, data, isLoading } = useTableExplorer()
  const isEmpty = data.length === 0

  return (
    <div className='flex flex-col flex-1 self-stretch !w-[calc(100vw-18rem)] overflow-hidden'>
      <AppHeader
        title={
         tableName
        }
        titleClassName="font-mono"
        right={<TableActionView />}
      />
      {(() => {
        if (isLoading) {
          return (
            <div className="space-y-2 p-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          )
        }

        if (isEmpty && !isLoading) {
          return (
            <div className="flex items-center justify-center mx-auto w-1/2">
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>No data found</AlertTitle>
                <AlertDescription>The table is empty.</AlertDescription>
              </Alert>
            </div>
          )
        }
        return <DataTable table={table} isLoading={isLoading} />
      })()}
    </div>
  )
}

export default TableExplorer
