import Cart from "@/components/ui/Cart";
import WishList from "@/pages/WishList";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "./../components/layout/MainLayout";
import Contact from "./../pages/Contact";
import Home from "./../pages/Home";

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
    ],
  },
]);

export default router;
