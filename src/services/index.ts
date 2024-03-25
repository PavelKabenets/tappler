import { AddressType, ServiceCategoryType, ServicesLocationType } from "types"

export type ProsSignUpResponse = {
  id: number
  email: string
}

export type ProsSignUpRequest = {
  password: string
  email: string
}

export type ProsRegFlowRequest = {
  registeredName: string
  proType: "individual" | "company"
  mobileNumber: string
  accountStatus: "active" | "suspended" | "verified" | "idle" | "vacation"
  signupPlatform: "email" | "google" | "facebook"
  informationAbout: string
  dateOfBirth: string
  gender: "male" | "female"
  hours: {
    dayOfWeek:
      | "sunday"
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
    openingTime: string
    closingTime: string
  }[]

  socials: [
    {
      socialMedia: "facebook" | "instagram" | "linkedin" | "website" | "tiktok"
      socialLink: "facebook.com/propage"
    },
  ]
  serviceCategories: number[]
  address: AddressType
  paymentMethods: ("cash" | "credit card")[] | []
  referral: "google" | "youtube" | "tappler" | "friendsAndFamily" | "other"
  serviceLocation: ServicesLocationType
  userId: number
}

export type ServicesResponce = {
  data: ServiceCategoryType[]
  perPage: number
  page: number
  total: number
}
