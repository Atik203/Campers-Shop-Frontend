import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const orders = useAppSelector(
    (state: RootState) => state.product.orderedProducts
  );

  const total = orders.reduce((acc, order) => {
    const orderTotal = order.products.reduce((orderAcc, product) => {
      return orderAcc + product.price * product.quantity!;
    }, 0);
    return acc + orderTotal;
  }, 0);

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
                {orders.map((order) => (
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
                          <div key={product._id} className="flex py-6 sm:py-10">
                            <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                              <div className="lg:flex-1">
                                <div className="sm:flex">
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {product.title}
                                    </h4>
                                    <p className="mt-2 hidden text-sm text-gray-500 sm:block">
                                      {product.description}
                                    </p>
                                  </div>
                                  <p className="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0">
                                    {product.price}
                                  </p>
                                </div>
                                <div className="mt-2 flex text-sm font-medium sm:mt-4">
                                  <Link
                                    to={`/product-details/${product._id}`}
                                    className="text-primary hover:text-indigo-500"
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
                              <div className="mt-6 font-medium">
                                {order.orderData.deliveryMethod ===
                                "Express delivery" ? (
                                  <div className="flex space-x-2">
                                    <CheckIcon
                                      className="h-6 w-6 flex-none text-green-500"
                                      aria-hidden="true"
                                    />
                                    <p>Delivered</p>
                                  </div>
                                ) : (
                                  <p>Out for delivery</p>
                                )}
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
