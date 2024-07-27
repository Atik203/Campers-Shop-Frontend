import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider>;

interface PriceRangeFilterProps extends SliderProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onPriceChange,
  className,
  ...props
}: PriceRangeFilterProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  const handleSliderChange = (values: [number, number]) => {
    setPriceRange(values);
    onPriceChange(values[0], values[1]);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange([value, priceRange[1]]);
    onPriceChange(value, priceRange[1]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange([priceRange[0], value]);
    onPriceChange(priceRange[0], value);
  };

  return (
    <div className={cn("flex flex-col space-y-4 mb-3 mx-3", className)}>
      <h2 className="font-semibold my-1">Price Range</h2>
      <div className="flex space-x-4">
        <div className="flex flex-col">
          <label
            htmlFor="min-price"
            className="text-sm font-medium text-gray-700"
          >
            Min Price
          </label>
          <input
            id="min-price"
            type="number"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="max-price"
            className="text-sm font-medium text-gray-700"
          >
            Max Price
          </label>
          <input
            id="max-price"
            type="number"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <Slider
        defaultValue={priceRange}
        min={minPrice}
        max={maxPrice}
        step={1}
        onValueChange={handleSliderChange}
        className={cn("w-full", className)}
        {...props}
      />
    </div>
  );
}
