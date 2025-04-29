import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/restBaseApi";
import configUser from "./slices/configUser";
import emailSlice from './slices/emailSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderslice';
import { api as graphqlApi } from "./api/graphqlBaseApi";
import { localStorageMiddleware } from "./localStorageMiddleware";

export const store = configureStore({
  reducer: {
    configUser,
    [baseApi.reducerPath]: baseApi.reducer,
    [graphqlApi.reducerPath]: graphqlApi.reducer,
    email: emailSlice,
    cart: cartSlice,
    order: orderSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(localStorageMiddleware)
      .concat(baseApi.middleware)
      .concat(graphqlApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
