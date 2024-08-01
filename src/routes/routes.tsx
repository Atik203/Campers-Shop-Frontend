import About from "@/pages/About";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/order/Checkout";
import SuccessOrder from "@/pages/order/SuccessOrder";

import WishList from "@/pages/WishList";
import { routeGenerator } from "@/utils/routeGenerator";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

import ProductDetails from "@/pages/product/ProductDetails";
import Products from "@/pages/product/Products";
import DashboardLayout from "./../components/layout/DashboardLayout";
import MainLayout from "./../components/layout/MainLayout";
import Contact from "./../pages/Contact";
import Home from "./../pages/Home";
import { adminPaths } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/success-order",
        element: <SuccessOrder />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    // @ts-expect-error disable error
    children: routeGenerator(adminPaths),
  },
]);

export default router;
