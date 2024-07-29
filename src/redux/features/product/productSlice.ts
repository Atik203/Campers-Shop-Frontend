import { TProduct } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";
type FilterOption = {
  value: number;
  label: string;
  checked: boolean;
};

type Filter = {
  id: string;
  name: string;
  options: FilterOption[];
};
export interface ProductState {
  cartProducts: TProduct[];
  wishlistProducts: TProduct[];
  filters: Filter[];
}

const initialState: ProductState = {
  cartProducts: [],
  wishlistProducts: [],
  filters: [],
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
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { addTOCart, addToWishlist, setFilters } = productSlide.actions;

export default productSlide.reducer;
