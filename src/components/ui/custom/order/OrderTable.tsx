import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orderApi";
import { STATUS, TOrder } from "@/types";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import PaginationComponent from "../customUI/PaginationComponent";
import { TableSkeleton } from "../others/TableSkeleton";

const LIMITS = [5, 10, 15, 20, 25];

export function OrderTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, isLoading, isFetching } = useGetAllOrdersQuery(
    `page=${page}&limit=${limit}`
  );
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [DeleteOrder] = useDeleteOrderMutation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const result = await updateOrderStatus({
        orderId,
        status: newStatus,
      }).unwrap();
      if (result.success) {
        toast.success("Order Updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (isConfirmed) {
      try {
        const result = await DeleteOrder(orderId).unwrap();
        if (result.success) {
          toast.success("Order deleted successfully");
        }
      } catch (error) {
        toast.error("Failed to delete order");
      }
    }
  };

  const columns: ColumnDef<TOrder>[] = [
    {
      accessorKey: "products[0].images[0]",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.original.products[0]?.images[0]}
          alt={row.original.products[0]?.title}
          className="h-16 w-16 object-cover"
        />
      ),
    },
    {
      accessorKey: "products[0].title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="hover:text-primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.original.products[0]?.title}</div>,
    },
    {
      accessorKey: "products[0].category",
      header: "Category",
      cell: ({ row }) => <div>{row.original.products[0]?.category}</div>,
    },
    {
      accessorKey: "products[0].quantity",
      header: "Quantity",
      cell: ({ row }) => <div>{row.original.products[0]?.quantity || 1}</div>,
    },
    {
      accessorKey: "orderData.firstName",
      header: "Customer Name",
      cell: ({ row }) => (
        <div>
          {row.original.orderData.firstName} {row.original.orderData.lastName}
        </div>
      ),
    },
    {
      accessorKey: "orderData.time",
      header: "Order Time",
      cell: ({ row }) => <div>{row.original.orderData.time}</div>,
    },
    {
      accessorKey: "orderData.status",
      header: "Status",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              {row.original.orderData.status}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {STATUS.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                className="capitalize cursor-pointer"
                checked={status === row.original.orderData.status}
                onCheckedChange={() =>
                  handleStatusChange(row.original._id!, status)
                }
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      accessorKey: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              onClick={() => handleDeleteOrder(order._id!)}
              className="h-8 w-8 px-2 py-1 rounded-md bg-red-500 hover:bg-black text-white"
            >
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = Math.ceil(data?.totalData / limit);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer"
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="cursor-pointer ml-auto">
              Show <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {LIMITS.map((l, index) => (
              <DropdownMenuCheckboxItem
                key={index}
                className="capitalize cursor-pointer"
                checked={l === limit}
                onCheckedChange={() => setLimit(l)}
              >
                {l}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isFetching || isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
