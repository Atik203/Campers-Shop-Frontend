import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { STATUS, TOrder } from "@/types";

import { Link } from "react-router-dom";
function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function OrderHistory() {
  // const orders = useAppSelector((state: RootState) => state.order.orders);

  const { data, isLoading, isError } = useGetAllOrdersQuery(undefined);

  const orders: TOrder[] = data?.data || [];

  const total = orders.reduce((acc, order) => {
    const orderTotal = order.products.reduce((orderAcc, product) => {
      return orderAcc + product.price * (product.quantity! || 1);
    }, 0);
    return acc + orderTotal;
  }, 0);

  if (isLoading || isError) {
    return (
      <div className="mt-5 text-center text-gray-500">
        <p>Loading...</p>
      </div>
    );
  }
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  return (
    <div>
      {!orders.length ? (
        <div className="text-center mt-5 min-h-screen h-full">
          <h1 className="text-2xl font-bold">No order history</h1>
          <p className="font-semibold">
            You haven't placed any orders yet. <br />
            <Link to="/" className="text-primary hover:text-indigo-500">
              Continue shopping
            </Link>
          </p>
        </div>
      ) : (
        <div className="">
          <div className="mx-auto max-w-4xl py-8 sm:px-6 sm:py-16">
            <div className="px-4 sm:px-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Order history
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Check the status of recent orders, manage returns, and download
                invoices.
              </p>
            </div>

            <div className="mt-16">
              <h2 className="sr-only">Recent orders</h2>

              <div className="space-y-16 sm:space-y-24">
                {orders.map((order) => {
                  const statusIndex = STATUS.indexOf(order.orderData.status);
                  const progressPercentage =
                    ((statusIndex + 1) / STATUS.length) * 100;
                  return (
                    <div key={order.orderData.orderNumber}>
                      <div className="bg-gray-50 px-4 py-6 sm:rounded-lg items-center sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                        <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                          <div className="flex justify-between items-center md:block">
                            <dt className="font-medium text-gray-900">
                              Order number
                            </dt>
                            <dd className="md:mt-1">
                              {order.orderData.orderNumber}
                            </dd>
                          </div>
                          <div className="flex justify-between pt-4 md:block md:pt-0">
                            <dt className="font-medium text-gray-900">
                              Date placed
                            </dt>
                            <dd className="md:mt-1">
                              <h2>{order.orderData.time}</h2>
                            </dd>
                          </div>
                          <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                            <dt>Total amount</dt>
                            <dd className="md:mt-1">{total}</dd>
                          </div>
                        </dl>
                        <div className="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                          <p className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto">
                            View Invoice
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
                        <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
                          {order.products.map((product) => (
                            <div
                              key={product._id}
                              className="flex py-6 sm:py-10"
                            >
                              <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                                <div className="lg:flex-1">
                                  <div className="sm:flex">
                                    <div>
                                      <div className="text-start">
                                        <h4 className="font-medium text-gray-900">
                                          {product.title}
                                        </h4>
                                        <p className="mt-1 font-medium text-gray-900  sm:mt-0">
                                          {product.price}
                                        </p>
                                      </div>
                                      <div className="mt-2 flex space-x-6">
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
                                                  style={{
                                                    backgroundColor: color.hex,
                                                  }}
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
                                    </div>
                                  </div>
                                  <div className="mt-2 flex text-sm font-medium sm:mt-4">
                                    <Link
                                      to={`/product-details/${product._id}`}
                                      className="text-primary  hover:text-indigo-500"
                                    >
                                      View Product
                                    </Link>
                                    <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                                      <Link
                                        to={`/product-details/${product._id}`}
                                        className="text-primary hover:text-indigo-500"
                                      >
                                        Buy Again
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
                                <img
                                  src={product.images[0]}
                                  alt={product.title}
                                  className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
                        <h4 className="sr-only">Status</h4>
                        <p className="text-sm font-medium text-gray-900">
                          {order.orderData.status} on{" "}
                          {order.orderData.status === "Order Placed"
                            ? order.orderData.time
                            : formatDate(order.updatedAt as string)}
                        </p>
                        <div className="mt-6" aria-hidden="true">
                          <div className="overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{
                                width: `${progressPercentage}%`,
                              }}
                            />
                          </div>
                          <div className="mt-6 hidden grid-cols-5 text-sm font-medium text-gray-600 sm:grid">
                            <div className="text-primary">Order placed</div>
                            <div
                              className={classNames(
                                order.orderData.status === "Processing"
                                  ? "text-primary"
                                  : "",
                                "text-center"
                              )}
                            >
                              Processing
                            </div>
                            <div
                              className={classNames(
                                order.orderData.status === "Shipped"
                                  ? "text-primary"
                                  : "",
                                "text-center"
                              )}
                            >
                              Shipped
                            </div>
                            <div
                              className={classNames(
                                order.orderData.status === "Delivered"
                                  ? "text-primary"
                                  : "",
                                "text-right"
                              )}
                            >
                              Delivered
                            </div>
                            <div
                              className={classNames(
                                order.orderData.status === "Cancelled"
                                  ? "text-primary"
                                  : "",
                                "text-right"
                              )}
                            >
                              Cancelled
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
