import { RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export interface TReview {
  name: string;
  image: string;
  comment: string;
  rating: number;
}

export interface TProduct {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  averageRating?: number;
  brand: string;
  reviews?: TReview[];
  inStock?: boolean;
  size?: string;
  colors?: string[];
}

const product: TProduct = {
  _id: "1",
  title: "Zip Tote Basket",
  image:
    "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
  price: 140,
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, shoulder sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  category: "Accessories",
  stock: 12,
  averageRating: 4,
  brand: "Fashion Brand",
  colors: ["beige", "gray", "green"],
  reviews: [
    {
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      comment: "Great quality and versatile. Highly recommend!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      comment: "Love the design and material. Perfect for daily use.",
      rating: 4,
    },
    // More reviews...
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0] ?? ""
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
                {[
                  product.image,
                  ...(product.reviews
                    ? product.reviews.map((review) => review.image)
                    : []),
                ].map((src, index) => (
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
              {[
                product.image,
                ...(product.reviews
                  ? product.reviews.map((review) => review.image)
                  : []),
              ].map((src, index) => (
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
              <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.averageRating! > rating
                          ? "text-indigo-500"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">
                  {product.averageRating} out of 5 stars
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-600">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <span className="flex items-center space-x-3">
                    {product.colors?.map((color) => (
                      <RadioGroup.Option
                        key={color}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </span>
                </RadioGroup>
              </div>

              <div className="sm:flex-col1 mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>
                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            {/* Reviews Section */}
            <section aria-labelledby="reviews-heading" className="mt-12">
              <h2
                id="reviews-heading"
                className="text-lg font-medium text-gray-900"
              >
                Customer Reviews
              </h2>

              <div className="mt-6 space-y-10">
                {product.reviews?.map((review) => (
                  <div key={review.name} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={review.image}
                        alt=""
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {review.name}
                      </h3>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating
                                ? "text-indigo-500"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                      <div className="mt-4 text-sm text-gray-600">
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
