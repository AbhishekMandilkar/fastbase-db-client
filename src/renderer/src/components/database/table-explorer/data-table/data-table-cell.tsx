import React from 'react'
import {useDatabase} from '@/pages/database/slice/database-slice'

const DataTableCell = (props: {
  value: string | number | boolean
  columnName: string
}) => {
  const {value, columnName} = props
  const {selectedTableConfig} = useDatabase()
  const column = selectedTableConfig.get(columnName)
  

  const renderValue = () => {
    if (
      column?.type === 'timestamp' ||
      column?.type === 'date' ||
      column?.type === 'time' ||
      column?.type === 'timestamp without time zone'
    ) {
      return new Date(value as string).toLocaleString()
    }

    if (column?.type === 'boolean') {
      return value ? 'Yes' : 'No'
    }

    if (column?.type === 'json') {
      return JSON.stringify(value)
    }

    return value
  }

  return (
    <div className="line-clamp-1">{renderValue()}</div>
  )
}

export default DataTableCell