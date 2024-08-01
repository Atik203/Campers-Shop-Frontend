import { TDeliveryMethod, TOrderData, TPaymentMethod, TProduct } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const createOrderData = (
  data: TOrderData,
  products: TProduct[],
  selectedDeliveryMethod: TDeliveryMethod,
  selectedPaymentMethod: TPaymentMethod
) => ({
  products: products.map((product) => ({ _id: product._id })),
  orderData: {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    postalCode: data.postalCode,
    deliveryMethod: selectedDeliveryMethod.title,
    paymentMethod: selectedPaymentMethod.title,
    paymentDetails: {
      paymentType: selectedPaymentMethod.id,
      cardPaymentDetails:
        selectedPaymentMethod.id === "Stripe"
          ? {
              brand: data?.paymentDetails?.cardPaymentDetails?.brand,
              cardLast4: data?.paymentDetails?.cardPaymentDetails?.cardLast4,
              expireMonth:
                data?.paymentDetails?.cardPaymentDetails?.expireMonth,
              expireYear: data?.paymentDetails?.cardPaymentDetails?.expireYear,
              transactionId:
                data?.paymentDetails?.cardPaymentDetails?.transactionId,
            }
          : null,
    },
    time: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }), // e.g. "September 20, 2021, 3:48:00 PM"
    orderNumber: uuidv4().slice(0, 18),
    productQuantity: products.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
    })),
  },
});
