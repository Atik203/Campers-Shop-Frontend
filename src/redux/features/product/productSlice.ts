import { CheckoutFormInputs } from "@/pages/Checkout";
import { TProduct } from "@/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

type orderedProducts = {
  products: TProduct[];
  orderData: CheckoutFormInputs;
};

export interface ProductState {
  cartProducts: TProduct[];
  wishlistProducts: TProduct[];
  filters: Filter[];
  orderedProducts: TProduct[];
}

const initialState: ProductState = {
  cartProducts: [],
  wishlistProducts: [],
  filters: [],
  orderedProducts: [],
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
    removeCartProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product._id !== action.payload
      );
    },
    removeWishlistProduct: (state, action) => {
      state.wishlistProducts = state.wishlistProducts.filter(
        (product) => product._id !== action.payload
      );
    },
    updateCartProduct: (state, action) => {
      state.cartProducts = state.cartProducts.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
    incrementCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      state.cartProducts = state.cartProducts.map((product) => {
        if (product._id === action.payload.id) {
          const newStock = product.stock! - action.payload.quantity;
          return {
            ...product,
            quantity: product.quantity! + action.payload.quantity,
            stock: newStock,
            inStock: newStock > 0,
          };
        }
        return product;
      });
    },
    decrementCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      state.cartProducts = state.cartProducts.map((product) => {
        if (product._id === action.payload.id) {
          const newQuantity = product.quantity! - action.payload.quantity;
          const newStock = product.stock! + action.payload.quantity;
          return {
            ...product,
            quantity: newQuantity > 0 ? newQuantity : 0,
            stock: newStock,
            inStock: newStock > 0,
          };
        }
        return product;
      });
    },
    addOrderedProducts: (state, action) => {
      state.orderedProducts = [...state.orderedProducts, action.payload];
    },
  },
});

export const {
  addTOCart,
  addToWishlist,
  setFilters,
  removeCartProduct,
  removeWishlistProduct,
  updateCartProduct,
  incrementCartQuantity,
  decrementCartQuantity,
  addOrderedProducts,
} = productSlide.actions;

export default productSlide.reducer;
