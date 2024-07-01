import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import BackGroundImage from "../assets/background.jpg"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export type Payment = {
  amount: string;
  title: string;
  description: string;
  transactionType: string;
  date: Date;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "transactionType",
    header: "Transaction Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("transactionType")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="capitalize">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="capitalize font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize font-bold">{row.getValue("date")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.title)}
            >
              Copy title
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={()=> navigator.clipboard.writeText(payment.amount)}
            >copy amount</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

interface DataTableDemoProps {
  data: Payment[];
}

export function DataTableDemo({ data }: DataTableDemoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: { pagination: { pageSize: 5 }},
  });

  const totalAmount = data.reduce((acc, payment) => acc + parseFloat(payment.amount), 0);

  return (
    <div className="w-full bg-cover bg-center h-3/4" style={{ backgroundImage: `url(${BackGroundImage})` }}>
   
   <div className="flex flex-wrap items-center justify-between py-4 px-6 bg-white bg-opacity-80 shadow-md rounded-md space-y-4 md:space-y-0">
  <div className="flex items-center space-x-4">
    <Input
      placeholder="Filter title..."
      value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("title")?.setFilterValue(event.target.value)
      }
      className="max-w-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <div className="font-bold pl-4">
      Total Amount: {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(totalAmount)}
    </div>
  </div>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="ml-auto bg-white border border-gray-300 rounded-md shadow-sm">
        Columns <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="bg-white border border-gray-300 rounded-md shadow-lg">
      {table
        .getAllColumns()
        .filter((column) => column.getCanHide())
        .map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className="capitalize px-4 py-2 hover:bg-gray-100"
            checked={column.getIsVisible()}
            onCheckedChange={(value) =>
              column.toggleVisibility(!!value)
            }
          >
            {column.id}
          </DropdownMenuCheckboxItem>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
</div>

      <div className="rounded-md border shadow-md bg-white bg-opacity-80 mt-4 mx-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-gray-100 border-b">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id} className={`border-b ${row.getIsSelected() ? 'bg-blue-50' : ''}`}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 px-6">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-white border border-gray-300 rounded-md shadow-sm"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-white border border-gray-300 rounded-md shadow-sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTableDemo;