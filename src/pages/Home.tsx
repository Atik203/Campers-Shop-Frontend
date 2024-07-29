import HeroSection from "@/components/ui/HeroSection";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { setFilters } from "@/redux/features/product/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { formatProductFilters } from "@/utils/formatProductsFilters";
import { useEffect } from "react";

const Home = () => {
  const queryStrings = "page=1";

  const { data, isSuccess } = useGetAllProductsQuery(queryStrings, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      const filters = formatProductFilters(data?.data);
      dispatch(setFilters(filters));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Home;
