import { TProduct } from "@/types/product.types";

export const formatProductFilters = (products: TProduct[]) => {
  const colorSet = new Set<string>();
  const categorySet = new Set<string>();
  const sizeSet = new Set<string>();

  products.forEach((product) => {
    if (product.color) {
      colorSet.add(product.color);
    }
    if (product.category) {
      categorySet.add(product.category);
    }
    if (product.size) {
      sizeSet.add(product.size);
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

// const filters = [
//   {
//     id: "stock",
//     name: "Availability",
//     options: [
//       { value: "in-stock", label: "In-Stock", checked: false },
//       { value: "out-of-stock", label: "Out of Stock", checked: false },
//     ],
//   },
//   {
//     id: "color",
//     name: "Color",
//     options: [
//       { value: "white", label: "White", checked: false },
//       { value: "beige", label: "Beige", checked: false },
//     ],
//   },
//   {
//     id: "category",
//     name: "Category",
//     options: [
//       { value: "travel", label: "Travel", checked: true },
//       { value: "organization", label: "Organization", checked: false },
//     ],
//   },
//   {
//     id: "size",
//     name: "Size",
//     options: [
//       { value: "2l", label: "2L", checked: false },
//       { value: "40l", label: "40L", checked: true },
//     ],
//   },
// ];
