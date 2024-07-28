import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rating } from "@/components/ui/Rating";
import { TProduct } from "@/types/product.types";
import _ from "lodash";

const ProductCardList: React.FC<TProduct> = ({
  title,
  category,
  size,
  color,
  price,
  stock,
  description,
  image,
  averageRating,
}) => {
  return (
    <Card className="w-full flex flex-col md:flex-row bg-slate-100 shadow-md">
      <CardHeader className="flex-shrink-0 md:w-1/4">
        <img
          src={image}
          alt={title}
          className="w-full h-44 object-contain rounded"
        />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{category}</CardDescription>
        {size && <p>Size: {size}</p>}
        {color && <p>Color: {color}</p>}
        <p>Price: ${price}</p>
        <p>Stock: {stock}</p>
        <p>{_.truncate(description, { length: 200 })}</p>
        <Rating rating={averageRating as number} readOnly variant="yellow" />
      </CardContent>
      <CardFooter className="flex-shrink-0 md:w-1/4">
        <Button
          variant="outline"
          className="bg-primary text-white hover:bg-indigo-600 hover:text-white"
        >
          Show Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCardList;
