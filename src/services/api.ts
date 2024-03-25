import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "config"
import {
  ProsRegFlowRequest,
  ProsSignUpRequest,
  ProsSignUpResponse,
  ServicesResponce,
} from "services"
import { RootState } from "store"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const { token } = state.auth
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ["Auth", "Services"],
  endpoints: (builder) => ({
    prosSignUp: builder.mutation<ProsSignUpResponse, ProsSignUpRequest>({
      query: (body) => ({
        url: "/pros/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    prosRegFlow: builder.mutation<any, Partial<ProsRegFlowRequest>>({
      query: (body) => ({
        url: "/pros",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getServices: builder.query<ServicesResponce, void | string>({
      query: (body) =>
        "/services?page=1&perPage=100&sort=ASC" +
        (typeof body === "string" ? `&search=${body}` : ""),
      providesTags: ["Services"],
    }),
  }),
})

export const {
  useProsSignUpMutation,
  useProsRegFlowMutation,
  useGetServicesQuery,
} = api
