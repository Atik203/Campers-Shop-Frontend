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
const ProductCardGrid: React.FC<TProduct> = ({
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
    <Card className="w-full bg-slate-100 shadow-md">
      <CardHeader>
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-contain mb-4 rounded"
        />
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent>
        {size && <p>Size: {size}</p>}
        {color && <p>Color: {color}</p>}
        <p>Price: ${price}</p>
        <p>Stock: {stock}</p>
        <Rating rating={averageRating as number} readOnly variant="yellow" />
        <p>{_.truncate(description, { length: 80 })}</p>
      </CardContent>
      <CardFooter>
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

export default ProductCardGrid;
