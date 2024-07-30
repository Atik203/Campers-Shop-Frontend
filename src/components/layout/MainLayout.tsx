import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { setFilters } from "@/redux/features/product/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { formatProductFilters } from "@/utils/formatProductsFilters";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Banner from "../ui/Banner";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";

const MainLayout = () => {
  const queryStrings = "page=1";
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
