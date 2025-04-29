import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import Cookies from "js-cookie";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URI,
    prepareHeaders: (headers, { getState }) => {
      const cookies = Cookies.get('RSM')
      const state = getState() as RootState;
      const token = state.configUser?.token;

      if (token || cookies) {
        headers.set("authorization", `Bearer ${token || cookies}`);
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
