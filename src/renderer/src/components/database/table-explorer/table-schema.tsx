"use client"

import * as React from "react"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, Key, Link2 } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import useSqlQuery from "../hooks/use-sql-query"
import {getTableContraintsQuery, getTableSchemaQuery} from "@/lib/sql-queries"
import {useParams} from "react-router"
import useActiveTableName from "../hooks/use-active-table-name"
import { ColumnDef, ConstraintDef} from "src/shared/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TableColumns extends ColumnDef {
  constraints: ConstraintDef[];
  isPrimaryKey: boolean;
}

const columnHelper = createColumnHelper<TableColumns>()

  // Define columns including the new constraints column
  const columns = [
    columnHelper.accessor("column_name", {
      header: "Column Name",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <span className="font-mono">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("data_type", {
      header: "Type",
      cell: (info) => (
        <Badge variant="secondary" className="border-0 font-mono ">
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor("is_nullable", {
      header: "Nullable",
      cell: (info) => (
        <p
          className="italic text-muted-foreground font-mono"
        >
          {info.getValue() ? "NULL" : "NOT NULL"}
        </p>
      ),
    }),
    columnHelper.accessor("column_default", {
      header: "Default",
      cell: (info) => <span className="font-mono text-sm text-muted-foreground">{info.getValue() || "-"}</span>,
    }),
    columnHelper.accessor("constraints", {
      header: "Constraints",
      cell: (info) => {
        const constraints = info.getValue() as ConstraintDef[];
        if (!constraints || constraints.length === 0) return <span className="text-muted-foreground">-</span>;
        
        return (
          <div className="flex flex-wrap gap-1">
            {constraints.map((constraint, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="font-mono text-xs flex items-center gap-1">
                      {constraint.constraint_type === 'FOREIGN KEY' && (
                        <Link2 className="mr-1 h-3 w-3" />
                      )}
                      {constraint.constraint_type === 'PRIMARY KEY' ? (
                        <Key className="h-4 w-4 text-amber-500" />
                      ) : constraint.constraint_type === 'FOREIGN KEY' ? (
                        `FK: ${constraint.foreign_table_name}`
                      ) : (
                        constraint.constraint_type
                      )}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-mono text-xs">{constraint.constraint_name}</p>
                    {constraint.foreign_table_name && constraint.foreign_column_name && (
                      <p className="font-mono text-xs">
                        References {constraint.foreign_table_name}.{constraint.foreign_column_name}
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        )
      },
    }),
  ];

interface TableSchema {
  columns: TableColumns[];
  constraintsMap: Map<string, ConstraintDef[]>;
}

export default function TableSchema() {
  const [tableSchema, setTableSchema] = React.useState<TableSchema | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [loading, setLoading] = React.useState(true)
  const {handleQuery, isPending} = useSqlQuery()
  const tableName = useActiveTableName();

  // Create a function to transform constraints array into a map
  const createConstraintsMap = (constraints: ConstraintDef[]) => {
    const map = new Map<string, ConstraintDef[]>();
    
    constraints.forEach(constraint => {
      if (!map.has(constraint.column_name)) {
        map.set(constraint.column_name, []);
      }
      
      map.get(constraint.column_name)?.push(constraint);
    });
    
    return map;
  };

  const fetchTableSchema = React.useCallback(async () => {
    try {
      const tableSchemaInfoPromise = handleQuery(getTableSchemaQuery(tableName))
      const tableConstraintsPromise = handleQuery(getTableContraintsQuery(tableName))

      const [tableSchemaInfo, tableConstraints] = await Promise.all([tableSchemaInfoPromise, tableConstraintsPromise])
      
      // Create constraints map for faster lookups
      const constraintsMap = createConstraintsMap(tableConstraints?.[0]?.rows as ConstraintDef[] || []);
      
      // Enhance columns with constraint information
      const enhancedColumns: TableColumns[] = tableSchemaInfo[0]?.rows?.map((column: ColumnDef) => {
        const columnConstraints = constraintsMap.get(column.column_name) || [];
        const isPrimaryKey = columnConstraints.some(c => c.constraint_type === "PRIMARY KEY");
        
        return {
          ...column,
          isPrimaryKey,
          constraints: columnConstraints
        };
      });
      console.log(enhancedColumns, constraintsMap)
      setTableSchema({
        columns: enhancedColumns,
        constraintsMap
      });
    } catch (error) {
      console.error("Error fetching table schema:", error);
    } finally {
      setLoading(false);
    }
  }, [tableName, handleQuery]);

  React.useEffect(() => {
    fetchTableSchema();
  }, [fetchTableSchema]);



  const table = useReactTable({
    data: tableSchema?.columns || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  console.log(tableSchema, loading, isPending)

  return (
    <div className="bg-grid-small-black/[0.2]  p-6 flex items-start justify-center">
      <div className="w-full max-w-6xl bg-sidebar rounded-none border">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold ">{tableName}</h2>
          </div>

          <div className="border bg-red">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : (
                            <div
                              className={
                                header.column.getCanSort()
                                  ? 'flex items-center gap-2 cursor-pointer select-none'
                                  : ''
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <ArrowUp className="h-4 w-4" />,
                                desc: <ArrowDown className="h-4 w-4" />
                              }[header.column.getIsSorted() as string] ??
                                (header.column.getCanSort() ? (
                                  <ArrowUpDown className="h-4 w-4" />
                                ) : null)}
                            </div>
                          )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center ">
                      <div className="flex items-center justify-center ">Loading schema...</div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center ">
                      No schema found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}