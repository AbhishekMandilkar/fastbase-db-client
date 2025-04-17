import React from "react";
import {
  flexRender,
  Table as ReactTableType,
  HeaderGroup,
  Row,
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import DataTableCell from "./table-cell/data-table-cell";

interface DataTableV2Props {
  table: ReactTableType<any>;
}

const DataTableV2: React.FC<DataTableV2Props> = ({ table }) => {
  return (
    <div className="w-full overflow-auto rounded shadow">
      <Table className="min-w-full border-collapse table-auto">
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const width = header.getSize();
                return (
                  <TableHead
                    key={header.id}
                    style={{ width }}
                     className="text-left text-xs font-medium text-muted-foreground first:pl-2 last:pr-2 border-b border-r font-mono relative"
                  >
                    {header.isPlaceholder ? null : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                    )}

                    {/* Resize handle */}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-blue-300"
                      />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className='border-b'>
          {table.getRowModel().rows.map((row: Row<any>) => (
            <TableRow key={row.id} className="border-t hover:bg-muted/50">
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="text-sm first:pl-2 last:pr-2 border-r whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
                >
                  <div className="truncate">
                    {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                    <DataTableCell value={cell.getValue() as string} columnName={cell.column.id} />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTableV2;
