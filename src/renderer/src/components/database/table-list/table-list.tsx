import React from 'react'
import { Link } from 'react-router'
import { useTableList } from './use-table-list'
import SidebarListing from '@/components/ui/sidebar-listing'
import {TableWithColumns} from 'src/shared/types'

function TableList() {
  const { tables, isFreshLoading, selectedTable, setSearch } = useTableList()

  const renderTableItem = (table: TableWithColumns) => (
    <Link to={table.name} className="flex items-center justify-between w-full">
      <span>{table.name}</span>
      <span>{table.columns.length}</span>
    </Link>
  )

  return (
    <SidebarListing
      title="Tables"
      items={tables}
      isLoading={isFreshLoading}
      selectedItem={selectedTable}
      renderItem={renderTableItem}
      onSearch={setSearch}
    />
  )
}

export default TableList
