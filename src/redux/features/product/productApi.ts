import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "product/",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
