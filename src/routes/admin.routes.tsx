import OrderHistory from "@/pages/OrderHistory";
import UpdateProduct from "@/pages/UpdateProduct";
import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  PlusCircleIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import AddProduct from "../pages/AddProduct";
import AllProducts from "../pages/AllProducts";
import Dashboard from "./../pages/Dashboard";
export const adminPaths = [
  {
    name: "Home",
    path: "home",
    element: <Dashboard />,
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    name: "Products Management",
    icon: <Cog6ToothIcon className="h-6 w-6" />,
    children: [
      {
        name: "Add Product",
        path: "add-product",
        element: <AddProduct />,
        icon: <PlusCircleIcon className="h-6 w-6" />,
      },
      {
        name: "All Products",
        path: "all-products",
        element: <AllProducts />,
        icon: <TableCellsIcon className="h-6 w-6" />,
      },
    ],
  },
  {
    path: "update-product/:id",
    element: <UpdateProduct />,
  },
  {
    name: "Orders",
    path: "orders",
    element: <OrderHistory />,
    icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
  },
];
