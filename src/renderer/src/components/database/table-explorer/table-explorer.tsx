import AppHeader from '@/components/app-header'
import MainView from '@/components/main-view-wrapper'
import React from 'react'
import useTableExplorer from './use-table-explorer'
import { DataTable } from './data-table/data-table'
import { useDatabase } from '@/pages/database/slice/database-slice'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon, Rows2Icon, Rows3Icon, RowsIcon, Table } from 'lucide-react'
import TableActionView from './table-actions/table-right-action-view'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TableSchema from './table-schema'

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
    <MainView className="flex flex-col flex-1">
      <Tabs defaultValue={tableExplorerTabs[0].value} className='h-full'>
        <AppHeader
          title={
            <TabsList className="">
              {tableExplorerTabs.map((tab) => (
                <TabsTrigger value={tab.value}>
                  <tab.icon />
                </TabsTrigger>
              ))}
            </TabsList>
          }
          titleClassName="font-mono"
          right={<TableActionView />}
        />
        <TabsContent value={tabs.rows} className="mt-0 flex-1">
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

            return (
              <ScrollArea className="flex-1 broder max-h-full">
                <DataTable table={table} isLoading={isLoading} />
              </ScrollArea>
            )
          })()}
        </TabsContent>
        <TabsContent value={tabs.structure} className="mt-0 flex-1">
          <TableSchema />
        </TabsContent>
      </Tabs>
    </MainView>
  )
}

export default TableExplorer
