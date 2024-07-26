import { HomeIcon, StarIcon } from "@heroicons/react/24/solid";
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
    icon: <HomeIcon className="h-6 w-6" />,
    children: [
      {
        name: "Add Product",
        path: "add-product",
        element: <AddProduct />,
        icon: <StarIcon className="h-6 w-6" />,
      },
      {
        name: "All Products",
        path: "all-products",
        element: <AllProducts />,
      },
    ],
  },
];
