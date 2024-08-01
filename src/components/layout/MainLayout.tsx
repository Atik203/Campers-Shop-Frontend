import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { setFilters } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatProductFilters } from "@/utils/formatProductsFilters";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Banner from "../ui/custom/customUI/Banner";
import Footer from "../ui/custom/others/Footer";
import Navbar from "../ui/custom/others/Navbar";

const MainLayout = () => {
  const queryStrings = "page=1&limit=100";
  const products = useAppSelector((state) => state.product.cartProducts);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (products.length > 0) {
        event.preventDefault();
        event.returnValue =
          "You have items in your cart. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [products]);

  const { data, isSuccess } = useGetAllProductsQuery(queryStrings, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    pollingInterval: 30000,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      const filters = formatProductFilters(data?.data);
      dispatch(setFilters(filters));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div className="max-w-8xl mx-auto">
      <Banner />
      <Navbar />
      <div className="max-w-7xl mx-auto min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
