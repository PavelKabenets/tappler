import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "config"
import {
  FlightFilterRequest,
  FlightRequest,
  FlightResponse,
  SearchAirlaneResponse,
  SearchAiroportResponse,
  UserRequest,
  UserResponse,
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
  tagTypes: ["Auth", "Flight"],
  endpoints: (builder) => ({
    //
  }),
})

export const {
  //
} = api
