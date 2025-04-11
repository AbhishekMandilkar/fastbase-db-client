import type {Table as TableType} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import DataTableCell from "./data-table-cell"
import { cn } from "@/lib/utils"
import React from "react"

interface DataTableProps<TData> {
  table: TableType<TData>
  className?: string
  isLoading?: boolean
}

export function DataTable<TData>({ table, className, isLoading }: DataTableProps<TData>) {

  const columnSizeVars = React.useMemo(() => {
    const headers = table.getFlatHeaders()
    const colSizes: { [key: string]: number } = {}
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!
      colSizes[`--header-${header.id}-size`] = header.getSize()
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
    }
    return colSizes
  }, [table.getState().columnSizingInfo, table.getState().columnSizing])


  return (
      <div className="overflow-auto">
        <Table {...{
            className: 'divTable',
            style: {
              ...columnSizeVars, //Define column sizes on the <table> element
              width: table.getTotalSize(),
            },
          }}>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-left text-xs font-medium text-muted-foreground first:pl-2 last:pr-2 border-b border-r font-mono relative"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : header.column.columnDef.header?.toString()}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={cn(
                        "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none",
                        header.column.getIsResizing() ? "bg-primary" : "bg-border"
                      )}
                    />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='border-b'>
            {isLoading ? (
              // Loading skeleton rows
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`loading-${index}`} className="border-t">
                  {table.getHeaderGroups()[0]?.headers.map((header, cellIndex) => (
                    <TableCell
                      key={`loading-cell-${cellIndex}`}
                      className="text-sm first:pl-2 last:pr-2 border-r"
                      style={{ width: header.getSize() }}
                    >
                      <div className="h-4 bg-muted animate-pulse rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-t hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-sm first:pl-2 last:pr-2 border-r"
                      style={{ width: cell.column.getSize() }}
                    >
                      <DataTableCell value={cell.getValue() as string} columnName={cell.column.id} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
  )
}

