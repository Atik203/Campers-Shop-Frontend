import { TProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder, TOrderData } from "../../../types/order.types";

export type OrderState = {
  orders: TOrder[];
  currentOrder: TOrder | null;
};

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (
      state,
      action: PayloadAction<{
        products: TProduct[];
        orderData: TOrderData;
      }>
    ) => {
      const { products, orderData } = action.payload;
      state.orders = [
        ...state.orders,
        {
          products,
          orderData,
        },
      ];
      state.currentOrder = {
        products,
        orderData,
      };
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
