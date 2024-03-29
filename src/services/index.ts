import { FlightItemType, User } from "types"

export type UserRequest = {
  userName: string
  password: string
}

export type UserResponse = User

export type FlightRequest = {
  fromAirportId: number
  toAirportId: number
  airlineId: number
  date: string
  type: string
  flightNumber: string
  seatNumber: string
  rate: number
  comment: string
}

export type FlightResponse = {
  count: number
  limit: number
  skip: number
  data: FlightItemType[]
}

export type SearchAiroportResponse = {
  count: number
  limit: number
  skip: number
  data: {
    id: number
    name: string
    iata_code: string
    latitude_deg: number
    longitude_deg: number
  }[]
}

export type SearchAirlaneResponse = {
  count: number
  limit: number
  skip: number
  data: {
    id: number
    name: string
    ICAO: string
  }[]
}

export type FlightFilterRequest = {
  skip: number
  startDate?: string
  endDate?: string
  type?: "international" | "domestic" | ""
}
