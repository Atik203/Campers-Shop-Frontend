import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rating } from "@/components/ui/custom/customUI/Rating";
import { TProduct } from "@/types/product.types";
import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";

type TProductCard = {
  showSizeColor?: boolean;
  showDescription?: boolean;
};

const ProductCardGrid: React.FC<TProduct & TProductCard> = ({
  _id,
  title,
  category,
  sizes,
  colors,
  price,
  description,
  images,
  averageRating,
  showSizeColor = false,
  showDescription = true,
}) => {
  return (
    <Card className="w-full bg-slate-100 shadow-md">
      <CardHeader>
        <img
          src={images[0]}
          alt={title}
          className="w-full h-44 md:h-40  object-contain rounded"
        />
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent className="-mt-4">
        {showSizeColor && (
          <>
            {sizes && <p>Sizes: {sizes.join(", ")}</p>}
            {colors && (
              <p>Colors: {colors.map((color) => color.name).join(", ")}</p>
            )}
          </>
        )}
        <p>Price: ${price}</p>
        <Rating rating={averageRating as number} readOnly variant="yellow" />
        {showDescription && <p>{_.truncate(description, { length: 60 })}</p>}
      </CardContent>
      <CardFooter>
        <Link to={`/product-details/${_id}`}>
          <Button className="bg-primary text-white text-sm hover:bg-indigo-600 hover:text-white">
            Show Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCardGrid;
