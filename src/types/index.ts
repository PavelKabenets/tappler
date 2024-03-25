import { ImageSourcePropType } from "react-native"

export type FeaturesCarouselItemType = {
  id: string
  img?: ImageSourcePropType
  title: string
  description: string
}

export type ResultFlowDataType =
  | {
      accoutType?: "individual" | "company"
      personalInfo?: Partial<{
        businessName?: string
        firstName: string
        lastName: string
        address: string
        city: string
        governorate: string
        gender: string
        coords: {
          lat: number
          lon: number
        }
      }>
      aboutMe?: string
      businessHours?: BusinessHoursItemType[]
      payments?: ("cash" | "credit card")[] | []
      phone?: string
      isVerify?: boolean
      referral?: {
        type: "google" | "youtube" | "tappler" | "friendsAndFamily" | "other"
        code?: string
      }
      profilePhoto?: string
      photos?: string[]
      isValid?: boolean
      currentStep?: number
      currentBarStep?: number
    }
  | undefined

export type GovernorateItemType = string

export type BusinessHoursItemValueType = { openAt: string; closeAt: string }

export type BusinessHoursItemType = {
  title: DaysOfWeekType
  value: BusinessHoursItemValueType
  isSelected: boolean
}

export type AddressType = {
  streetAddress: string
  unitNumber: string
  city: string
  governorate: string
  longitude: number
  latitude: number
}

export type ServicesLocationType = {
  locationType: "office" | "home" | "store" | "warehouse"
  isRemote: boolean
  cities: [string]
}

export type UserType = {
  id: number
  email: string
}

export type SubCategoryType = {
  id: number
  name: string
  descriptionForPros: string
  descriptionForCustomers: string
  keywords: string
  picture: string
  interviewRequired: boolean
  allowedEmployeeType: string
  opportunityPointsCost: number
  hasMenu: boolean
  criminalRecordsRequired: boolean
  healthRecordsRequired: boolean
  locationPhotoRequired: boolean
  serviceId: number
  relatedServiceCategoriesIds: number[]
  placeOfService: string[]
  // @TO DO - remova any
  proQuestions: any[]
  customerQuestions: any[]
}

export type ServiceCategoryType = {
  id: number
  name: string
  categories: SubCategoryType[]
}

export type DaysOfWeekType =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"

export type LatLng = {
  lat: number
  lng: number
}
export type PlusCode = {
  compound_code: string
  global_code: string
}

export type GeocoderResultType = {
  address_components: {
    long_name: string
    short_name: string
    types: string[]
  }[]
  formatted_address: string
  geometry: {
    bounds: {
      northeast: LatLng
      southwest: LatLng
    }
    location: LatLng
    location_type: "APPROXIMATE" | "ROOFTOP" | string
    viewport: {
      northeast: LatLng
      southwest: LatLng
    }
  }
  place_id: string
  types: string[]
  plus_code: PlusCode
}[]

export type GeocoderResponse = {
  plus_code: PlusCode
  results: GeocoderResultType
  status: "OK" | string
}

export type ErrorSignUpEmailType = {
  data: {
    message: number
    path: string
    statusCode: number
    timestamp: string
    validationErrors: { email: string[] }
  }
  status: number
}
