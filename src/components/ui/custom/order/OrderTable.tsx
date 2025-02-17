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
import { Link } from "react-router-dom";
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
      accessorKey: "Image",
      header: "Image",
      cell: ({ row }) => {
        const products = row.original.products;
        return (
          <div className="flex flex-col items-end">
            {products.map((product) => (
              <img
                key={product._id}
                src={product.images[0]}
                alt={product.title}
                className="h-16 w-16 object-cover"
              />
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "Title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="hover:text-primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const products = row.original.products;
        return (
          <div className="flex flex-col gap-6 items-start">
            {products.map((product, index) => (
              <Link
                to={`/product-details/${product._id}`}
                className="cursor-pointer"
                key={product._id}
              >
                {index + 1}. {product.title}
              </Link>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "Category",
      header: "Category",
      cell: ({ row }) => {
        const products = row.original.products;
        return (
          <div className="flex flex-col gap-6 items-start">
            {products.map((product, index) => (
              <h1 key={product._id}>
                {index + 1}. {product.category}
              </h1>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "Quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const products = row.original.products;
        return (
          <div className="flex flex-col gap-6 items-start">
            {products.map((product, index) => (
              <h1 key={product._id}>
                {index + 1}. {product.quantity || 1}pcs
              </h1>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "Customer Name",
      header: "Customer Name",
      cell: ({ row }) => (
        <div>
          {row.original.orderData.firstName} {row.original.orderData.lastName}
        </div>
      ),
    },
    {
      accessorKey: "Order Time",
      header: "Order Time",
      cell: ({ row }) => <div>{row.original.orderData.time}</div>,
    },
    {
      accessorKey: "Order Number",
      header: "Order Number",
      cell: ({ row }) => <div>{row.original.orderData.orderNumber}</div>,
    },
    {
      accessorKey: "Payment & Delivery Method",
      header: "Payment & Delivery Method",
      cell: ({ row }) => {
        const { paymentMethod, deliveryMethod } = row.original.orderData;
        return (
          <div className="">
            <h1>
              {paymentMethod} & {deliveryMethod}
            </h1>
          </div>
        );
      },
    },
    {
      accessorKey: "Total Payment",
      header: "Total Payment",
      cell: ({ row }) => (
        <div>
          $
          {row.original.products.reduce(
            (acc, product) => acc + product.price * (product.quantity || 1),
            0
          )}
        </div>
      ),
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="cursor-pointer text-sm">
              {row.original.orderData.status}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {STATUS.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                style={{ fontWeight: "normal", fontSize: "1rem" }}
                className="capitalize cursor-pointer text-sm"
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
      accessorKey: "Actions",
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
                    <TableHead
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "14px",
                      }}
                      key={header.id}
                    >
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
                  <TableRow
                    style={{
                      color: "black",
                      fontSize: "14px",
                    }}
                    key={row.id}
                  >
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
