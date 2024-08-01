import { TProduct } from "./product.types";

export type TCardPaymentDetails = {
  _id?: string;
  brand?: string;
  cardLast4?: string;
  expireMonth?: string;
  expireYear?: string;
  transactionId: string;
};

export type TPaymentDetails = {
  _id?: string;
  paymentType: string;
  cardPaymentDetails?: TCardPaymentDetails;
};

export interface TOrderData {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod?: string;
  deliveryMethod?: string;
  paymentDetails?: TPaymentDetails;
  time: string;
  orderNumber: string;
  productQuantity?: {
    productId?: string;
    quantity?: number;
  }[];
}

export interface TOrder {
  _id?: string;
  products: TProduct[];
  orderData: TOrderData;
}

export interface TSubmitOrder {
  products: { _id: string }[];
  orderData: TOrderData;
}

export type TDeliveryMethod = {
  id: number;
  title: string;
  price: number;
  turnaround: string;
};

export type TPaymentMethod = {
  id: string;
  title: string;
};
