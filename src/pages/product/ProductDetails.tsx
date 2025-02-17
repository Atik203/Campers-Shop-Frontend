import ProductDetailsSkeleton from "@/components/ui/custom/customUI/ProductDetailsSkeleton";
import ReviewSection from "@/components/ui/custom/customUI/ReviewSection";
import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import {
  addTOCart,
  addToWishlist,
  updateCartProduct,
} from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { RootState } from "@/redux/store";
import { TProduct, TReview } from "@/types/product.types";
import {
  Label,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BookmarkCheck, BookMarked } from "lucide-react";
import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const cartProducts = useAppSelector(
    (state: RootState) => state.product.cartProducts
  );

  const { data, isFetching, isLoading, isSuccess } =
    useGetSingleProductQuery(id);

  const product: TProduct = data?.data;
  let reviews;
  if (isSuccess) {
    reviews = {
      ...product.reviews,
      averageRating: product.averageRating,
    } as TReview;
  }

  const handleWishlist = () => {
    const toastId = toast.loading("Updating wishlist...");
    dispatch(addToWishlist(product));
    setIsWishlisted(true);
    toast.success("Added to wishlist", { id: toastId });
  };
  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    if (!selectedColor.length || !selectedSize.length || quantity <= 0) {
      return toast.error("Please select color, size and quantity");
    }

    const colors = product?.colors?.filter((color) =>
      selectedColor.includes(color.name)
    );
    const sizes = product?.sizes?.filter((size) => selectedSize.includes(size));
    const newStock = product.stock - quantity;

    const cartProduct = cartProducts.find((item) => item._id === product._id);

    if (cartProduct) {
      const stock = cartProduct.stock - quantity;

      if (stock < 0) {
        setIsButtonDisabled(true);
        return toast.error("Out of stock");
      }

      const addNewColors = colors?.filter(
        (color) => !cartProduct.colors?.includes(color)
      );

      const addNewSizes = sizes?.filter(
        (size) => !cartProduct.sizes?.includes(size)
      );

      const newCartProduct = {
        ...cartProduct,
        stock,
        colors: [...cartProduct.colors!, ...addNewColors!],
        sizes: [...cartProduct.sizes!, ...addNewSizes!],
        quantity: (cartProduct?.quantity ?? 0) + quantity,
      };
      const toastId = toast.loading("Updating cart...");
      dispatch(updateCartProduct(newCartProduct));
      return toast.success("Added to cart", { id: toastId });
    } else if (newStock < 0) {
      setIsButtonDisabled(true);
      return toast.error("Out of stock");
    } else {
      const cartItem = {
        ...product,
        colors,
        sizes,
        stock: newStock,
        quantity,
      };
      const toastId = toast.loading("Adding to cart...");
      dispatch(addTOCart(cartItem));
      toast.success("Added to cart", { id: toastId });
    }
  };

  return (
    <div className="min-h-svh">
      {isFetching || isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <div>
          <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* Image gallery */}
              <TabGroup as="div" className="flex flex-col-reverse">
                {/* Image selector */}
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                  <TabList className="grid grid-cols-4 gap-6">
                    {product.images.map((src, index: number) => (
                      <Tab
                        key={index}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only">{`Image ${
                              index + 1
                            }`}</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <img
                                src={src}
                                alt={`Product image ${index + 1}`}
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected
                                  ? "ring-indigo-500"
                                  : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                  </TabList>
                </div>

                <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                  {product.images.map((src, index) => (
                    <TabPanel key={index}>
                      {/* <img
                        src={src}
                        alt={`Product image ${index + 1}`}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                      /> */}
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: `Product image ${index + 1}`,
                            isFluidWidth: true,
                            src: src,
                            sizes:
                              "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                          },
                          largeImage: {
                            src: src,
                            width: 1200,
                            height: 1800,
                          },
                          lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                          enlargedImageContainerDimensions: {
                            width: "150%",
                            height: "150%",
                          },
                          enlargedImagePosition: "over",
                          enlargedImageStyle: { objectFit: "contain" },
                        }}
                        style={{ width: "100%", height: "100%" }}
                        imageClassName="object-contain w-full h-full sm:rounded-lg"
                      />
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                      {product.title}
                    </h1>
                    <p className="">
                      By:{" "}
                      <span className="text-primary font-medium">
                        {product.brand}
                      </span>{" "}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleWishlist}
                    disabled={isWishlisted}
                    className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
                  >
                    {isWishlisted ? (
                      <BookmarkCheck className="h-8 w-8 text-primary" />
                    ) : (
                      <BookMarked className="h-8 w-8 text-primary" />
                    )}
                  </button>
                </div>
                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    ${product.price}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <RadioGroupLabel className="sr-only">
                      Choose a color
                    </RadioGroupLabel>
                    <div className="flex items-center space-x-3">
                      {product?.colors?.map((color) => (
                        <RadioGroupOption
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
                          <Label as="span" className="sr-only">
                            {color.name}
                          </Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                            style={{ backgroundColor: color.hex }}
                          />
                        </RadioGroupOption>
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
                    <Label className="sr-only">Choose a size</Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {product.sizes?.map((size) => (
                        <RadioGroupOption
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
                          <Label as="span">{size}</Label>
                        </RadioGroupOption>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      Quantity
                    </h3>
                  </div>

                  <div className="mt-2 flex items-center">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="px-3 py-1 border rounded-md bg-gray-100 hover:text-primary hover:bg-gray-200"
                    >
                      <MinusIcon className="h-6 w-6" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      max={product.stock}
                      min={0}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="mx-2 w-20 text-center border rounded-md"
                    />
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= product.stock}
                      className="px-3 py-1 border rounded-md bg-gray-100 hover:text-primary hover:bg-gray-200"
                    >
                      <PlusIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {product.stock ? (
                  <div className="mt-4">
                    <p className="flex items-center gap-1">
                      <CheckIcon className="w-5 h-5" /> In Stock
                    </p>
                    <p className="mt-4">Stock: {product.stock} </p>
                  </div>
                ) : (
                  <p className="flex items-center gap-1">
                    <XMarkIcon className="w-5 h-5" /> Our of Stock
                  </p>
                )}

                <button
                  type="button"
                  disabled={
                    isButtonDisabled ||
                    product.stock <= 0 ||
                    product.inStock === false
                  }
                  onClick={handleAddToCart}
                  className={`mt-10 flex w-full items-center cursor-pointer justify-center rounded-md border border-transparent py-3 px-8 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    isButtonDisabled ||
                    product.stock <= 0 ||
                    product.inStock === false
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-indigo-700"
                  }`}
                >
                  Add to Cart
                </button>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold">Description:</h3>
                  <div className="">
                    <p className="text-base text-justify ">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {reviews && <ReviewSection reviews={reviews} />}
        </div>
      )}
    </div>
  );
}
