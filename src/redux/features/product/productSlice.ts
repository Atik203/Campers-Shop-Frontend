import { TProduct } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
  cartProducts: TProduct[];
  wishlistProducts: TProduct[];
}

const initialState: ProductState = {
  cartProducts: [],
  wishlistProducts: [],
};

const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    addTOCart: (state, action) => {
      state.cartProducts = [...state.cartProducts, action.payload];
    },
    addToWishlist: (state, action) => {
      state.wishlistProducts = [...state.wishlistProducts, action.payload];
    },
  },
});

export const { addTOCart, addToWishlist } = productSlide.actions;

export default productSlide.reducer;
