import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row p-4 border rounded-lg shadow-md space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex-shrink-0">
        <Skeleton className="w-full md:w-96 h-64 rounded-lg bg-gray-300" />
      </div>
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-8 w-3/4 bg-gray-300" />
        <Skeleton className="h-4 w-full bg-gray-300" />
        <Skeleton className="h-4 w-5/6 bg-gray-300" />
        <Skeleton className="h-4 w-2/3 bg-gray-300" />
        <Skeleton className="h-4 w-1/2 bg-gray-300" />
        <Skeleton className="h-4 w-1/3 bg-gray-300" />
        <Skeleton className="h-10 w-1/4 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
