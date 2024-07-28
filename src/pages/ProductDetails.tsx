import { RadioGroup, Tab } from "@headlessui/react";
import { useState } from "react";

const product = {
  title: "Stylish Backpack",
  images: [
    "https://res.cloudinary.com/cloudinary203/image/upload/v1722104316/tqmtqujj4rjhb1bewqil.jpg",
    "https://res.cloudinary.com/cloudinary203/image/upload/v1722104316/tqmtqujj4rjhb1bewqil.jpg",
    "https://res.cloudinary.com/cloudinary203/image/upload/v1722104351/j63s43xytek8jwik5txj.jpg",
  ],
  price: 49.99,
  description:
    "A stylish and spacious backpack, perfect for daily use and travel.",
  category: "Bags",
  stock: 20,
  averageRating: 4.5,
  brand: "Brand A",
  inStock: true,
  sizes: ["S", "M", "L"],
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Red", hex: "#FF0000" },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0]?.name ?? ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes[0] ?? ""
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product.images.map((src, index) => (
                  <Tab
                    key={index}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{`Image ${index + 1}`}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            src={src}
                            alt={`Product image ${index + 1}`}
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {product.images.map((src, index) => (
                <Tab.Panel key={index}>
                  <img
                    src={src}
                    alt={`Product image ${index + 1}`}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>

              <RadioGroup
                value={selectedColor}
                onChange={setSelectedColor}
                className="mt-2"
              >
                <RadioGroup.Label className="sr-only">
                  Choose a color
                </RadioGroup.Label>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color) => (
                    <RadioGroup.Option
                      key={color.name}
                      value={color.name}
                      className={({ active, checked }) =>
                        classNames(
                          color.hex,
                          active && checked ? "ring ring-offset-1" : "",
                          !active && checked ? "ring-2" : "",
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                        )
                      }
                    >
                      <RadioGroup.Label as="span" className="sr-only">
                        {color.name}
                      </RadioGroup.Label>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          "h-8 w-8 rounded-full border border-black border-opacity-10"
                        )}
                        style={{ backgroundColor: color.hex }}
                      />
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
              </div>

              <RadioGroup
                value={selectedSize}
                onChange={setSelectedSize}
                className="mt-2"
              >
                <RadioGroup.Label className="sr-only">
                  Choose a size
                </RadioGroup.Label>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {product.sizes.map((size) => (
                    <RadioGroup.Option
                      key={size}
                      value={size}
                      className={({ active, checked }) =>
                        classNames(
                          active ? "ring-2 ring-indigo-500" : "",
                          checked
                            ? "bg-primary text-white hover:bg-primary"
                            : "bg-white text-gray-900 hover:bg-gray-50",
                          "flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase sm:flex-1"
                        )
                      }
                    >
                      <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <button
              type="button"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
