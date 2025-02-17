import AllOrders from "@/pages/order/AllOrders";
import OrderHistory from "@/pages/order/OrderHistory";
import UpdateProduct from "@/pages/product/UpdateProduct";
import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  PlusCircleIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import AddProduct from "../pages/product/AddProduct";
import AllProducts from "../pages/product/AllProducts";
import Dashboard from "./../pages/Dashboard";
export const adminPaths = [
  {
    name: "Home",
    path: "home",
    element: <Dashboard />,
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    name: "Management",
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
      {
        name: "All Orders",
        path: "all-orders",
        element: <AllOrders />,
        icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
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
