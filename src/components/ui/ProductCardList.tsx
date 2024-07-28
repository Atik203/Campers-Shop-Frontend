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
import React from "react";
import { Link } from "react-router-dom";

const ProductCardList: React.FC<TProduct> = ({
  _id,
  title,
  category,
  sizes,
  colors,
  price,
  stock,
  description,
  images,
  averageRating,
}) => {
  return (
    <Card className="w-full flex flex-col md:flex-row bg-slate-100 shadow-md">
      <CardHeader className="flex-shrink-0 md:w-1/4">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-44 object-contain rounded"
        />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{category}</CardDescription>
        {sizes && <p>Sizes: {sizes.join(", ")}</p>}
        {colors && (
          <p>Colors: {colors.map((color) => color.name).join(", ")}</p>
        )}
        <p>Price: ${price}</p>
        <p>Stock: {stock}</p>
        <p>{_.truncate(description, { length: 200 })}</p>
        <Rating rating={averageRating as number} readOnly variant="yellow" />
      </CardContent>
      <CardFooter className="flex-shrink-0 md:w-1/4">
        <Link to={`/product-details/${_id}`}>
          <Button
            variant="outline"
            className="bg-primary text-white hover:bg-indigo-600 hover:text-white"
          >
            Show Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCardList;
