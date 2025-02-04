"use client"

import type React from "react"
import type { Table as TableType } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import DataTableCell from "./data-table-cell"
import {ScrollArea} from "@/components/ui/scroll-area"

interface DataTableProps<TData> {
  table: TableType<TData>
  className?: string
  isLoading?: boolean
}

export function DataTable<TData>({ table, className, isLoading }: DataTableProps<TData>) {
  return (
      <Table className="max-h-full">
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-left text-xs font-medium text-muted-foreground first:pl-6 last:pr-6 border-b border-r font-mono"
                >
                  {header.isPlaceholder ? null : header.column.columnDef.header?.toString()}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className='max-h-full border-b'>
          {isLoading ? (
            // Loading skeleton rows
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`loading-${index}`} className="border-t">
                {table.getHeaderGroups()[0]?.headers.map((header, cellIndex) => (
                  <TableCell
                    key={`loading-cell-${cellIndex}`}
                    className="text-sm first:pl-6 last:pr-6 border-r max-w-[200px]"
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
                    className="text-sm first:pl-6 last:pr-6 border-r max-w-[200px]"
                  >
                    <DataTableCell value={cell.getValue() as string} columnName={cell.column.id} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
  )
}

