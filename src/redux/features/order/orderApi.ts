import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (query) => ({
        url: `/order/?${query}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "order/create-order/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order", "Product"],
    }),

    getSingleOrder: builder.query({
      query: (id) => ({
        url: `order/${id}/`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `order/delete-order/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order", "Product"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `order/update-order/`,
        method: "PUT",
        body: { status, id: orderId },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetSingleOrderQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
