import React from 'react'
import { useDatabase } from '@/pages/database/slice/database-slice'
import { getCellRenderValueByColumnType } from './util'
import clsx from 'clsx';

const DataTableCell = (props: { value: string | number | boolean | Date | null; columnName: string }) => {
  const { value, columnName } = props
  const { selectedTableConfig } = useDatabase()
  const column = selectedTableConfig.get(columnName)

  const {displayValue, className} = getCellRenderValueByColumnType(value, column?.type || "")

  return <div className={clsx("line-clamp-1 overflow-hidden ", className)}>{displayValue}</div>
}

export default DataTableCell
