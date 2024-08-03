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
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/productApi";
import { useAppSelector } from "@/redux/hooks";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import PaginationComponent from "../customUI/PaginationComponent";
import { TableSkeleton } from "../others/TableSkeleton";

export type Product = {
  _id?: string;
  title: string;
  images: string[];
  price: number;
  category: string;
  stock: number;
  brand: string;
};

const LIMITS = [5, 10, 15, 20, 25];

export function ProductTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const search = useAppSelector((state) => state.search.searchTerm);

  const { data, isLoading, isFetching } = useGetAllProductsQuery(
    `page=${page}&limit=${limit}&search=${search}`
  );

  const [DeleteProduct] = useDeleteProductMutation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleDeleteProduct = async (id: string) => {
    const toastId = toast.loading("Deleting product...");
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const deleteResult = await DeleteProduct(id).unwrap();
        if (deleteResult.success) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
          toast.success("Product deleted successfully", { id: toastId });
        } else {
          toast.error("Failed to delete product", { id: toastId });
        }
      } catch (error) {
        toast.error("Failed to delete product", { id: toastId });
      }
    }
  };
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.original.images[0]}
          alt={row.original.title}
          className="h-16 w-16 object-cover"
        />
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="hover:text-primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Link
          to={`/product-details/${row.original._id}`}
          className="text-black hover:text-primary"
        >
          {row.original.title}
        </Link>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.original.category}</div>,
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="hover:text-primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>${row.original.price.toFixed(2)}</div>,
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <Button
          variant={"ghost"}
          className="hover:text-primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.original.stock}</div>,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <div>{row.original.brand}</div>,
    },
    {
      accessorKey: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex space-x-2">
            <Link
              to={`/dashboard/update-product/${product._id}`}
              className="h-8 w-8 px-2 py-1 rounded-md bg-secondary-foreground text-white"
            >
              <Edit3 className="h-5 w-5" />
            </Link>
            <Button
              onClick={() => handleDeleteProduct(product._id as string)}
              className="h-8 w-8 px-2 py-1 rounded-md bg-red-500 text-white"
            >
              <Trash2 className="h-5 w-5" />
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

  const totalPages = Math.ceil(data?.totalData / 6);

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
                .map((column) => {
                  return (
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
                  );
                })}
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
            {LIMITS.map((l, index) => {
              return (
                <DropdownMenuCheckboxItem
                  key={index}
                  className="capitalize cursor-pointer"
                  checked={l === limit}
                  onCheckedChange={() => setLimit(l)}
                >
                  {l}
                </DropdownMenuCheckboxItem>
              );
            })}
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
