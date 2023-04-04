import {configureStore} from "@reduxjs/toolkit"
import { productApi } from "./features/Product/productSlice";
import { userApi } from "./features/user/registerSlice";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]:productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productApi.middleware)
});


export default store;