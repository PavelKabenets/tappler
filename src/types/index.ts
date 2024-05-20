import { ImageSourcePropType } from "react-native"
import { ImageOrVideo } from "react-native-image-crop-picker"
import {
  ProsResponse,
  ProsServicesCategoriesResponse,
  ResponseTimeResponse,
} from "services"

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
      profilePhoto?: ImageOrVideo
      photos?: ImageOrVideo[]
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
  longitude: number
  latitude: number
  city: string
  governorate: string
  changedAt?: null | string
}

export type ServicesLocationType = {
  locationType: "office" | "home" | "store" | "warehouse"
  isRemote: boolean
  cities: [string]
}

export type UserType = ProsResponse & {
  email: string
  responseTimePeriods: Omit<ResponseTimeResponse, "proId">
}

export type PlaceType =
  | "proToCustomer"
  | "customerToPro"
  | "remoteOrOnline"
  | "delivery"

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
  placeOfService: PlaceType[]
  proQuestions: ProQuestionsCategoryType[]
  customerQuestions: CustomerQuestionsCategoriesType[]
}

export type QuestionAssigneeType =
  | "shortAnswer"
  | "paragraph"
  | "oneChoice"
  | "multipleChoice"
  | "dateTime"

export type ProQuestionsCategoryType = {
  id: number
  assignee: "pro" | "customer"
  type: QuestionAssigneeType
  text: string
  order: number
  serviceCategoryId: number
  options: ProQuestionsCategoryOptionsType[]
}

export type CustomerQuestionsCategoriesType = {
  id: number
  assignee: "pro" | "customer"
  type: QuestionAssigneeType
  text: string
  order: number
  options: Omit<ProQuestionsCategoryOptionsType, "questionId">[]
}
export type ProQuestionsCategoryOptionsType = {
  id: number
  label: string
  value: string
  questionId: number
}

export type ServiceCategoryType = {
  id: number
  name: string
  categories: SubCategoryType[]
}

export type MyServiceDetailCategorySelectType = {
  service: ServiceCategoryType
  type: "my-service" | undefined
  myServicesCategoriesData: ProsServicesCategoriesResponse[]
}

export type DaysOfWeekType =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"

export type HoursType = {
  dayOfWeek: DaysOfWeekType
  openingTime: string
  closingTime: string
}

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

export type DocumentsType = {
  documentType: string
  documentNumber: string
  documentFile: string
  issueDate: string
  ExpirationDate: string
}

export type MediaType = {
  media: string
}

export type SocialType = {
  id: number
  socialMedia: "facebook" | "instagram" | "linkedin" | "website" | "tiktok"
  socialLink: string
  proId: number
}

export type AddressHistoryType = {
  streetAddress: string
  unitNumber: string
  longitude: number
  latitude: number
  city: string
  governorate: string
  changedAt: string
}

export type SuspensionsType = {
  systemSuspension: boolean
  suspendedReason: string
  suspensionDate: string
  unsuspendedDate: string
  suspendedById: number
}

export type AccountStatusType =
  | "registered"
  | "active"
  | "suspended"
  | "verified"
  | "idle"
  | "vacation"

export type ProfileEditsType = {
  id: number
  postedOn: string
  updatedInformationAbout: string
  previousInformationAbout: string
  proId: number
  status: "pending" | "approved" | "rejected"
  processedAt: string
  processedById: number
  rejectReason: string
  processedBy: {
    id: number
    status: "active" | "suspended" | "deleted"
    firstName: string
    lastName: string
    address: string
    city: string
    country: string
    dateOfBirth: "1990-11-28T15:59:20.598Z"
    gender: "male" | "famale"
    homePhone: string
    mobilePhone: string
    employmentType: "full time" | "part time" | "contractor" | "seasonal"
    currentPosition: string
    profilePhoto: string
    lastSeen: string
    joinDate: string
    userId: number
    department: "admin" | "sales" | "quality" | "reviews" | "customer service"
    statusHistory: {
      status: "active" | "suspended" | "deleted"
      changedOn: string
      changedById: number
    }[]
    targets: {
      id: number
      unit:
        | "sales amount"
        | "sales quotes"
        | "reviews processing"
        | "profile approvals"
        | "documents processing"
        | "customer care tickets"
      monthlyTarget: number
      employeeId: number
    }[]
    permissions: {
      sales: boolean
      leaderboard: boolean
      accounting: boolean
      customers: boolean
      quality: boolean
      pros: boolean
      customerCare: boolean
      jobs: boolean
      viewConversations: boolean
    }
    activityLogs: {
      date: string
      actionType: "login" | "resetPassword"
    }[]
    systemLogs: {
      date: string
      actionType: "activateAccount" | "deactivateAccount"
      reason: string
      actionDoneByEmployeeId: number
    }[]
  }
  pro: string
}

export type SignUpPlatformType = "email" | "google" | "facebook"

export type ReferralType =
  | "google"
  | "youtube"
  | "tappler"
  | "friendsAndFamily"
  | "other"

// export type PlaceOfServiceType =

export type JobGovernatureType = {
  id: number
  name: string
}

export type JobCityType = {
  id: number
  name: string
  governorates: JobGovernatureType[]
}

export type JobAddressType = { id: number } & AddressType

export type CustomerType = {
  id: number
  firstName: string
  lastName: string
  gender: "male" | "female"
  mobileNumber: string
  email: string
  status: "verified" | "unverified" | "active" | "suspended"
  signupPlatform: "google" | "facebook" | "email"
  accountCreationDate: string
  lastSeen: string
  addresses: AddressType[]
  emailVerified: boolean
}

export type JobProsType = {
  jobId: number
  proId: number
  selectionStatus:
    | "selected"
    | "opportunity"
    | "offer"
    | "proRejected"
    | "customerRejected"
  responseTime: number
  opportunityNotes: string
  ratePerHour: number
  proOfferSentAt: string
  proOpportunityOfferSentAt: string
  rejectedByProAt: string
  opportunityRejectedAt: string
  opportunityAcceptedAt: string
}

export type QuestionsAnswersType = {
  answer: string
  questionId: number
  question: CustomerQuestionsCategoriesType
  optionId: number
  optionsIds: number[]
  option: Omit<ProQuestionsCategoryOptionsType, "questionId">
  date: string
  startTime: string
  endTime: string
  options?: number[]
}

export type JobType = {
  id: number
  requestedOn: string
  status: "completed" | "cancelled" | "active"
  cityId?: number
  customerId: number
  serviceCategoryId: number
  address?: JobAddressType
  customer: CustomerType
  serviceCategory: SubCategoryType & {
    rejectReason: string
    isRevised: boolean
  }
  serviceArea?: JobCityType
  questionsAnswers?: QuestionsAnswersType
  pros?: JobProsType[]
}

export type ServiceLocationType = "office" | "home" | "store" | "warehouse"

export type PlaceOfServiceType = {
  place: PlaceType
  serviceLocationAreas: ServiceLocationAreasType[]
  serviceLocationType: ServiceLocationType
  deliveryRadius: number
  pickupLocationType: ServiceLocationType
  pickupAddress: Omit<AddressType, "unitNumber" | "changedAt">
}

export type ReviewScoreType = {
  qualityScore: number
  completionInTimeScore: number
  jobAwarenessScore: number
  honestyScore: number
  responseTimeScore: number
  overallScore: number
  reviewsCount: number
}

export type ProType = {
  id: number
  registeredName: string
  proType: "individual" | "company"
  mobileNumber: string
  accountStatus: AccountStatusType
  lastSeen: null | string
  email: string
  signupPlatform: SignUpPlatformType
  pointsBalance: number
  informationAbout: string
  profilePhoto: null | string[]
  verifiedCompany: null | string[]
  dateOfBirth: string
  gender: "male" | "female"
  isProVerified: null | boolean
  referral: ReferralType
  serviceLocation: ServicesLocationType
  hours: HoursType[]
  documents: DocumentsType[]
  media: MediaType[]
  socials: SocialType[]
  address: AddressType
  addressHistory: AddressHistoryType[]
  suspensions: SuspensionsType[]
  paymentMethods: string[]
  profileEdits: ProfileEditsType[]
  isFeatured: boolean
  responseTimeHours: null | string
  responseTimeScore: null | string
  reviewScore: null | number
  emailVerified: boolean
}

export type ReviewItemType = ReviewScoreType & {
  id: number
  jobId: number
  proId: number
  customerId: number
  comment: string
  proCompletedJob: boolean
  reviewDate: string
  status: "pending" | "approved" | "rejected"
  customer: CustomerType
  pro?: ProType
  job?: JobType
  serviceCategory?: SubCategoryType
  rejectReason: string
  isRevised: boolean
}

export type ServiceLocationAreasType = {
  city: string
  governorate: string
}

export type FoodOptionChoiceType = {
  name: string
  price: string | number
  discountPrice?: string | number
}

export type FoodOptionType = {
  index?: number
  name: string
  isRequired: boolean
  minQty: string | number
  maxQty: string | number
  choices: FoodOptionChoiceType[]
}

export type MenuItemType = {
  id: number
  name: string
  description: string
  price: number
  discountPrice: number
  isExpressDeliveryAvailable: boolean
  isPreOrderOnly: boolean
  options?: FoodOptionType[]
  photo: string
  inStock?: boolean
}

export type MenuSectionType = {
  id: number
  title: string
  order: number
  menuItems: MenuItemType[]
}

export type MenuType = {
  foodCategories: any[]
  deliveryCharge: number
  freeDeliveryThreshold: number | null
  totalOrderValueDiscountRate: number | null
  totalOrderValueDiscountThreshold: number | null
  menuSections: MenuSectionType[]
}

export type DocumentFilesType = {
  assignment: "id.front" | "id.back" | "id.selfie" | "companyTradeLicense"
  fileKey?: string
  url?: string
}

export type IdDocumentData = {
  name: string
  idNumber: string
  dateOfBirth: string
  expirationDate: string
}

export type TradeLicenseDocumentData = {
  licenseNumber: string
  registrationDate: string
}

export type PointsItemPackagesType = {
  id: number
  status: "active" | "expired"
  pointsAmount: number
  price: number
  originalPrice: number
  saving: number
  description: string
  startDate: string
  expirationDate: string
}
