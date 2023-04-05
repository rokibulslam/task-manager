import {configureStore} from "@reduxjs/toolkit"
import { productApi } from "./features/Product/productSlice";
import { userApi } from "./features/user/registerSlice";

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, productApi.middleware]),
});

export default store;