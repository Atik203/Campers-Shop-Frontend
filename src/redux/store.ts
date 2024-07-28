import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { baseApi } from "./api/baseApi";
import productReducer, { ProductState } from "./features/product/productSlice";
import searchReducer, { SearchState } from "./features/product/searchSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    search: searchReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = {
  search: SearchState;
  product: ProductState;
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
};
export type AppDispatch = typeof store.dispatch;
