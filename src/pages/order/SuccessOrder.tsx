import { removeCurrentOrders } from "@/redux/features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TProduct } from "@/types/product.types";
import { Link } from "react-router-dom";

export default function SuccessOrder() {
  const currentOrder = useAppSelector(
    (state: RootState) => state.order.currentOrder
  );
  const dispatch = useAppDispatch();
  if (currentOrder?.products.length == 0) {
    return (
      <div className="min-h-screen text-center my-10 text-red-500 text-3xl font-bold">
        Order Failed
      </div>
    );
  }

  const total = (currentOrder?.products || []).reduce((total, product) => {
    return total + product.price * (product.quantity || 1);
  }, 0);

  const products = currentOrder?.products;
  const orderData = currentOrder?.orderData;
  const paymentDetails = currentOrder?.orderData.paymentDetails;

  return (
    <div className="mx-auto">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-20 lg:max-w-3xl lg:gap-x-8 lg:px-8 lg:py-20 xl:gap-x-24">
        <div className="lg:col-start-2">
          <h1 className="text-sm font-bold text-primary">Payment successful</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Thanks for ordering
          </p>
          <p className="mt-2 text-base text-gray-500">
            We appreciate your order, we’re currently processing it. So hang
            tight and we’ll send you confirmation very soon!
          </p>

          <dl className="mt-16 text-sm font-medium">
            <dt className="text-gray-900">Order number</dt>
            <dd className="mt-2 text-primary">{orderData?.orderNumber}</dd>
          </dl>

          <ul
            role="list"
            className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
          >
            {products?.map((product: TProduct) => (
              <li key={product._id} className="flex space-x-6 py-6">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                />
                <div className="flex-auto space-y-1">
                  <h3 className="text-gray900 hover:text-primary">
                    <Link to={`/product-details/${product._id}`}>
                      {product.title}
                    </Link>
                  </h3>
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
                </div>
                <p className="flex-none font-medium text-gray-900">
                  ${product.price * product.quantity!}
                </p>
              </li>
            ))}
          </ul>

          <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
            <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
              <dt className="text-base">Total</dt>
              <dd className="text-base">${total}</dd>
            </div>
          </dl>

          <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
            <div>
              <dt className="font-medium text-gray-900">
                Shipping Information
              </dt>
              <dd className="mt-2">
                <address className="not-italic">
                  <span className="block">
                    {currentOrder?.orderData.deliveryMethod}
                  </span>
                </address>
              </dd>
              <dt className="font-medium mt-2 text-gray-900">
                Shipping Address
              </dt>
              <dd className="mt-2">
                <address className="not-italic">
                  <span className="block">
                    {currentOrder?.orderData.address}
                  </span>
                  <span className="block">
                    {currentOrder?.orderData.city}-
                    {currentOrder?.orderData.postalCode}
                  </span>
                </address>
              </dd>
            </div>
            <div>
              {paymentDetails?.paymentType === "Stripe" ? (
                <div>
                  <dt className="font-medium text-gray-900">
                    Payment Information
                  </dt>
                  <dd className="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
                    <div className="flex-none">
                      <svg
                        aria-hidden="true"
                        width={36}
                        height={24}
                        viewBox="0 0 36 24"
                        className="h-6 w-auto"
                      >
                        <rect width={36} height={24} rx={4} fill="#224DBA" />
                        <path
                          d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                          fill="#fff"
                        />
                      </svg>
                      <p className="sr-only"></p>
                    </div>
                    <div className="flex-auto">
                      <p className="text-gray-900">
                        Transaction ID:{" "}
                        <span className="text-primary font-semibold">
                          {paymentDetails.cardPaymentDetails?.transactionId}
                        </span>
                      </p>

                      <p className="text-gray-900">
                        Ending with{" "}
                        {paymentDetails?.cardPaymentDetails?.cardLast4}
                      </p>
                      <p>
                        Expires{" "}
                        {paymentDetails?.cardPaymentDetails?.expireMonth} /
                        {paymentDetails?.cardPaymentDetails?.expireYear}
                      </p>
                      <p>Order Date & TIme: {orderData?.time}</p>
                    </div>
                  </dd>
                </div>
              ) : (
                <div>
                  <dt className="font-medium text-gray-900">
                    Payment Information
                  </dt>
                  <dd className="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
                    <div className="flex-auto">
                      <p className="text-gray-900">Cash on delivery</p>
                      <p className="text-gray-900">
                        Order Date & TIme: {orderData?.time}
                      </p>
                    </div>
                  </dd>
                </div>
              )}
            </div>
          </dl>

          <div className="mt-16 border-t border-gray-200 py-6 text-right">
            <Link
              to={"/products"}
              onClick={() => dispatch(removeCurrentOrders())}
              className="text-sm font-medium text-primary hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
