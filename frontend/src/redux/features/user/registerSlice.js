import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/v1"
    }),
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (data) => ({
                url: "/registration",
                method: "POST",
                body:data
            }),
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body:data
            }),
        })
    })
})

export const {useAddUserMutation, useLoginUserMutation } = userApi;