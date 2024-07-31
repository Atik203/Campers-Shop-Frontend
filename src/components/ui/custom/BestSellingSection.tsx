import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product.types";
import { CardSkeleton } from "../CardSkeleton";
import ProductCardGrid from "../ProductCardGrid";
import TitleDescriptionBlock from "../TitleDescriptionBlock";

const BestSellingSection = () => {
  const { data, isFetching, isError, isLoading } = useGetAllProductsQuery(
    "page=1&limit=4&sort=rating"
  );

  const products = data?.data;
  return (
    <div className="pb-16 ">
      <TitleDescriptionBlock
        title="Best Selling Products"
        description="Discover our top-selling products that customers love. These items are popular for their quality and value. Shop now to find out why they're our best sellers!"
      />
      <div>
        {(isError || isLoading || isFetching) && <CardSkeleton count={4} />}
        {products && (
          <div className="grid lg:grid-cols-4 items-center justify-center gap-4 md:grid-cols-2 grid-cols-1 ">
            {products?.map((product: TProduct) => (
              <ProductCardGrid key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellingSection;
