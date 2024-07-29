import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (queryString = "") => {
        const defaultParams = "minPrice=0&maxPrice=1000&page=1&limit=6";
        return {
          url: `product/?${
            queryString && queryString !== defaultParams
              ? queryString
              : "page=1&limit=6"
          }`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "product/create-product/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `product/${id}/`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useGetSingleProductQuery,
} = productApi;
