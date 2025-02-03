
import TableList from '@/components/database/table-list/table-list'
import React from 'react'
import {Outlet} from 'react-router'
const TablesView = () => {
  return (
    <div className="flex flex-1">
      <TableList />
      <Outlet />
    </div>
  )
}

export default TablesView