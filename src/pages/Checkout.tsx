import {
  addOrderedProducts,
  removeCartProduct,
} from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TProduct } from "@/types/product.types";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const deliveryMethods = [
  {
    id: 1,
    title: "Standard delivery",
    turnaround: "2–5 business days",
    price: 5,
  },
  {
    id: 2,
    title: "Express delivery",
    turnaround: "1–2 business days",
    price: 15,
  },
];

const paymentMethods = [
  { id: "cash-on-delivery", title: "Cash on delivery" },
  { id: "stripe", title: "Stripe" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface CheckoutFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  cardNumber?: string;
  nameOnCard?: string;
  expirationDate?: string;
  cvc?: string;
  paymentMethod?: string;
  deliveryMethod?: string;
  transactionId?: string;
}

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();

  const products = useAppSelector(
    (state: RootState) => state.product.cartProducts
  );
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<CheckoutFormInputs>();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  );

  const onSubmit = async (data: CheckoutFormInputs) => {
    const toastId = toast.loading("Processing Order...");

    const orderProductData = {
      products,
      orderData: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        apartment: data.apartment,
        city: data.city,
        postalCode: data.postalCode,
        deliveryMethod: selectedDeliveryMethod.title,
        paymentMethod: selectedPaymentMethod.title,
      },
    };

    if (selectedPaymentMethod.id === "stripe") {
      if (!stripe || !elements) {
        return;
      }
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
        billing_details: {
          name: data.firstName + " " + data.lastName,
          email: data.email,
          phone: data.phone,
          address: {
            line1: data.address,
            line2: data.apartment,
            city: data.city,
            postal_code: data.postalCode,
          },
        },
      });

      if (error) {
        toast.error("Payment failed. Please try again.", { id: toastId });
      } else {
        console.log(paymentMethod);

        // Handle payment success
        for (const product of products) {
          dispatch(
            addOrderedProducts({
              product,
              orderData: {
                ...orderProductData.orderData,
                transactionId: paymentMethod?.id,
              },
            })
          );
          dispatch(removeCartProduct(product._id));
        }

        toast.success("Order placed successfully.", { id: toastId });
      }
    } else {
      // Handle cash on delivery
      for (const product of products) {
        dispatch(
          addOrderedProducts({
            product,
            orderData: {
              ...orderProductData.orderData,
              transactionId: "COD",
            },
          })
        );
        dispatch(removeCartProduct(product._id));
      }
      toast.success("Order placed successfully.", { id: toastId });
    }
  };

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * (product?.quantity ?? 1),
    0
  );
  const total = subtotal + selectedDeliveryMethod.price;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("firstName")}
                      type="text"
                      id="first-name"
                      name="firstName"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("lastName")}
                      type="text"
                      id="last-name"
                      name="lastName"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("emailAddress")}
                    type="email"
                    id="email-address"
                    name="emailAddress"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    {...register("phone")}
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("address")}
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apartment, House, etc.
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("apartment")}
                      type="text"
                      name="apartment"
                      id="apartment"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("city")}
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("postalCode")}
                      type="text"
                      name="postalCode"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
              >
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Delivery method
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "ring-2 ring-indigo-500" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {deliveryMethod.turnaround}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                ${deliveryMethod.price}
                              </RadioGroup.Description>
                            </span>
                          </span>
                          {checked ? (
                            <CheckCircleIcon
                              className="h-5 w-5 text-indigo-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <fieldset>
                <legend className="text-lg font-medium text-gray-900">
                  Payment method
                </legend>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                  {paymentMethods.map((paymentMethod) => (
                    <div
                      key={paymentMethod.id}
                      className="relative flex items-start"
                    >
                      <div className="flex items-center h-5">
                        <input
                          id={paymentMethod.id}
                          name="paymentMethod"
                          type="radio"
                          value={paymentMethod.id}
                          checked={
                            selectedPaymentMethod.id === paymentMethod.id
                          }
                          onChange={() =>
                            setSelectedPaymentMethod(paymentMethod)
                          }
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor={paymentMethod.id}
                          className="font-medium text-gray-700"
                        >
                          {paymentMethod.title}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div>
                {selectedPaymentMethod.id === "stripe" ? (
                  <div className="max-w-md mx-auto my-6 bg-slate-100 p-12 shadow-md h-10">
                    <CardElement />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {products.map((product: TProduct) => (
                  <li key={product._id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-20 h-20 rounded-md object-center object-cover sm:w-24 sm:h-24"
                      />
                    </div>

                    <div className="ml-6 flex-1 flex flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <Link
                              to={`/product-details/${product._id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.title}
                            </Link>
                          </h4>

                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${product.price}
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-900">
                            quantity: {product?.quantity}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flow-root">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(removeCartProduct(product._id))
                            }
                            className="-m-2.5 p-2.5 inline-flex text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 pt-2 flex items-end justify-between">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          total: $
                          {(
                            product.price *
                            (product?.quantity ? product.quantity : 1)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-6 sm:px-6">
                <div className="flex justify-between text-sm font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal}</p>
                </div>
                <div className="mt-6 flex justify-between text-sm font-medium text-gray-900">
                  <p>Shipping</p>
                  <p>{selectedDeliveryMethod.price}</p>
                </div>
                <div className="mt-6 flex justify-between text-sm font-medium text-gray-900">
                  <p>Total</p>
                  <p>${total}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Place order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
