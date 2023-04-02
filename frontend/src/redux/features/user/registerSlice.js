import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/v1"
    }),
    tagTypes: ["login"],
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (data) => ({
                url: "/registration",
                method: "POST",
                body:data
            })
        })
    })
})

export const {useAddUserMutation } = userApi;