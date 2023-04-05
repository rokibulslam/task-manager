import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: (args) => {
        console.log(args);
        const { currentPage, perPage, searchKey } = args;
        return { url: `/productList/${currentPage}/${perPage}/${searchKey}?` };
      },
    }),
  }),
});

export const {useGetProductListQuery}=productApi