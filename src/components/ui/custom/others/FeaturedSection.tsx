import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product.types";
import { CardSkeleton } from "../customUI/CardSkeleton";
import ProductCardGrid from "../customUI/ProductCardGrid";
import TitleDescriptionBlock from "../customUI/TitleDescriptionBlock";

const shuffleArray = (array: TProduct[]) => {
  const arrayCopy = [...array]; // Create a copy of the array
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
};

const FeaturedSection = () => {
  const { data, isFetching, isError, isLoading } = useGetAllProductsQuery(
    "limit=4",
    {
      pollingInterval: 30000,
    }
  );

  const products = data?.data ? shuffleArray(data?.data) : null;
  return (
    <div className="pb-12 min-h-screen">
      <TitleDescriptionBlock
        title="Featured Products"
        description="Check out our featured products, handpicked for their exceptional quality and popularity. These items are highly recommended by our team and customers alike."
      />
      <div>
        {isError || isLoading || isFetching ? (
          <CardSkeleton count={4} />
        ) : (
          <div>
            {products && (
              <div className="grid lg:grid-cols-4 items-center justify-center gap-4 md:grid-cols-2 grid-cols-1 ">
                {products?.map((product: TProduct) => (
                  <ProductCardGrid key={product._id} {...product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedSection;
