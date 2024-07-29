import { removeCartProduct } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Cart() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: RootState) => state.product.cartProducts
  );
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.stock,
    0
  );

  const handleRemoveProduct = (id: string) => () => {
    const toastId = toast.loading("Removing product from cart...");
    dispatch(removeCartProduct(id));

    toast.success("Product removed from cart", { id: toastId });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {products.map((product) => (
                <li key={product._id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.description}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-base">
                            <Link to={`/product-details/${product._id}`}>
                              <h2 className="font-medium text-gray-700 hover:text-primary">
                                {product.title}
                              </h2>
                            </Link>
                          </h3>
                        </div>
                        <div className="mt-6 flex space-x-6">
                          <div className="flex items-center my-2 justify-center gap-2">
                            <h3 className="text-sm font-medium text-gray-900">
                              Color
                            </h3>
                            <div className="flex items-center justify-center gap-1">
                              {product?.colors?.map((color) => (
                                <div
                                  key={color.name}
                                  className="flex items-center justify-center space-x-2 flex-wrap"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="h-6 w-6 rounded-full border border-black border-opacity-10"
                                    style={{ backgroundColor: color.hex }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center my-2 justify-center gap-2">
                            <h3 className="text-sm font-medium text-gray-900">
                              Size
                            </h3>
                            <div className="flex items-center justify-center gap-1">
                              {product?.sizes?.map((size) => (
                                <div
                                  key={size}
                                  className="flex items-center justify-center rounded-md border py-1 px-2 text-sm font-medium uppercase bg-white text-gray-900"
                                >
                                  {size}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            onClick={handleRemoveProduct(product._id as string)}
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon
                              className="h-6 w-6 font-bold"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-start gap-2">
                      <div className="flex items-center justify-center">
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
                          value={product.quantity}
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
                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ClockIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-300"
                          aria-hidden="true"
                        />
                      )}

                      <span>
                        {product.inStock ? "In stock" : `Out of Stock`}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$0.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <a className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">
                      Learn more about how tax is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$0.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${subtotal.toFixed(2)}{" "}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link to="/checkout">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
