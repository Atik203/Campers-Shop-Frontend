import { TProduct } from "@/types/product.types";

export const formatProductFilters = (products: TProduct[]) => {
  const colorSet = new Set<string>();
  const categorySet = new Set<string>();
  const sizeSet = new Set<string>();

  products.forEach((product) => {
    if (product.colors) {
      product.colors.forEach((color) => colorSet.add(color.name));
    }
    if (product.category) {
      categorySet.add(product.category);
    }
    if (product.sizes) {
      product.sizes.forEach((size) => sizeSet.add(size));
    }
  });

  const formatOptions = (set: Set<string>) => {
    return Array.from(set).map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
      checked: false,
    }));
  };

  return [
    {
      id: "stock",
      name: "Availability",
      options: [
        { value: "in-stock", label: "In-Stock", checked: false },
        { value: "out-of-stock", label: "Out of Stock", checked: false },
      ],
    },
    {
      id: "color",
      name: "Color",
      options: formatOptions(colorSet),
    },
    {
      id: "category",
      name: "Category",
      options: formatOptions(categorySet),
    },
    {
      id: "size",
      name: "Size",
      options: formatOptions(sizeSet),
    },
  ];
};
