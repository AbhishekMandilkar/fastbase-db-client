import React from 'react'
import { useDatabase } from '@/pages/database/slice/database-slice'
import { format, formatISODuration, isDate, parseISO } from 'date-fns'

const DataTableCell = (props: { value: string | number | boolean | Date | null; columnName: string }) => {
  const { value, columnName } = props
  const { selectedTableConfig } = useDatabase()
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

    // check if date object using date-fns
    if (value instanceof Date) {
      return value.toLocaleString()
    }

    return value
  }

  return <div className="line-clamp-1">{renderValue()}</div>
}

export default DataTableCell
