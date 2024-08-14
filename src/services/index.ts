import {
  AccountStatusType,
  AddressHistoryType,
  AddressType,
  BusinessHoursItemType,
  CustomerType,
  DocumentsType,
  HoursType,
  JobType,
  MediaType,
  PlaceOfServiceType,
  ProType,
  ProfileEditsType,
  ReferralType,
  ReviewItemType,
  ReviewScoreType,
  ServiceCategoryType,
  ServiceLocationAreasType,
  ServicesLocationType,
  SignUpPlatformType,
  SocialType,
  SubCategoryType,
  SuspensionsType,
  QuestionsAnswersType,
  MenuType,
  MenuItemType,
  DocumentFilesType,
  IdDocumentData,
  TradeLicenseDocumentData,
  PointsItemPackagesType,
  HoursTypeResponse,
  PointsTransactionsHistoryType,
  PackageItemType,
  QuoteItemType,
  PaymentMethodType,
  VouchersAssignmentType,
  MenuSectionType,
  AvailableTrustStickerType,
  NotificationsItemType,
  NotificationsSettingItemType,
  SuspensionType,
  ProAdditionalDocumentsType,
} from "types"

export type ProsSignUpResponse = {
  id: number
  email: string
}

export type ProsSignUpRequest = {
  password: string
  email: string
  lang: string
}

export type ProsRegFlowRequest = {
  businessName?: string
  registeredName: string
  proType: "individual" | "company"
  mobileNumber: string
  accountStatus: "active" | "suspended" | "verified" | "idle" | "vacation"
  signupPlatform: "email" | "google" | "facebook"
  informationAbout: string
  dateOfBirth: string
  gender: "male" | "female"
  hours: HoursType[]
  socials:
    | {
        socialMedia:
          | "facebook"
          | "instagram"
          | "linkedin"
          | "website"
          | "tiktok"
        socialLink: "facebook.com/propage"
      }[]
    | []
  serviceCategories: number[]
  address: AddressType
  paymentMethods: ("cash" | "credit card")[] | []
  referral: "google" | "youtube" | "tappler" | "friendsAndFamily" | "other"
  serviceLocation: ServicesLocationType
  userId: number
  profilePhoto: string
  photosOfWork: string[] | [null]
}

export type ServicesResponce = {
  data: ServiceCategoryType[]
  perPage: number
  page: number
  total: number
}

export type AuthRequest = {
  email: string
  password: string
  userType: "customer" | "pro" | "employee"
  rememberMe: boolean
}

export type AuthResponse = {
  token: string
  refreshToken: string
  id: number
  userType: "customer" | "pro" | "employee"
}

export type ProsResponse = {
  id: number
  email: string

  registeredName: string
  proType: "individual" | "company"
  mobileNumber: string
  accountStatus: AccountStatusType
  lastSeen: string
  signupPlatform: SignUpPlatformType
  pointsBalance: number
  informationAbout: string
  profilePhoto: string
  verifiedCompany: boolean
  dateOfBirth: string
  gender: "male" | "female"
  isProVerified: boolean
  referral: ReferralType
  serviceLocation: ServicesLocationType
  hours: HoursTypeResponse[]
  documents: DocumentsType[]
  media: MediaType[]
  socials: SocialType[]
  address: AddressHistoryType
  addressHistory: AddressHistoryType[]
  suspensions: SuspensionsType[]
  businessName: string

  paymentMethods: string[]
  profileEdits: ProfileEditsType[]
  isFeatured: boolean
  responseTimeHours: number
  responseTimeScore: number
  reviewScore: ReviewScoreType
  emailVerified: boolean
  photosOfWork: string[] | []
}

export type AuthResetRequest = {
  email: string
  userType: "customer" | "pro" | "employee"
  lang: string
}

export type AuthResetConfirmRequest = {
  email: string
  userType: "customer" | "pro" | "employee"
  confirmationCode: string
  lang: string
}

export type AuthResetNewRequest = {
  email: string
  userType: "customer" | "pro" | "employee"
  confirmationCode: string
  password: string
  lang: string
}

export type ProsRegistrationResponse = {
  pro: ProType
  token: string
  refreshToken: string
}

export type ResponseTimeResponse = {
  proId: number
  weekResponseTime: number
  monthResponseTime: number
  lifeTimeResponseTime: number
}

export type ProsServicesCategoriesResponse = {
  serviceCategory: SubCategoryType
  status: "active" | "inactive" | "pendingInterview"
  placeOfService: PlaceOfServiceType[]
  questionsAnswers: QuestionsAnswersType[]
  // @TO DO
  menu: MenuType | null
  isFeatured: boolean
  suspension: SuspensionType
  proAdditionalDocuments?: ProAdditionalDocumentsType[]
}

export type MyReviewResponse = {
  data: ReviewItemType[]
  perPage: number
  page: number
  total: number
}

export type CreateProsServiceCategoriesRequest = {
  serviceCategoryId: number
}

export type ProsServicesCategoriesPlaceOfServiceRequest = Partial<{
  serviceLocationAreas: ServiceLocationAreasType[]
  serviceLocationType: "office" | "home" | "store" | "warehouse"
  deliveryRadius: number
  pickupLocationType: "office" | "home" | "store" | "warehouse"
  pickupAddress: Omit<AddressType, "unitNumber" | "changedAt">
}> & {
  id: number
  placeOfService: (
    | "proToCustomer"
    | "customerToPro"
    | "remoteOrOnline"
    | "delivery"
  )[]
}

export type RefreshTokenRequest = {
  token: string
  refreshToken: string
}

export type RefreshTokenResponse = {
  token: string
  refreshToken: string
  id: number
  userType: "customer" | "pro" | "employee"
}

export type ProsServicesQuestionRequest = {
  serivceId: number
  questionId: number
  optionId?: number
  optionsIds?: number[]
  answer?: string
  date?: string
  startTime?: string
  endTime?: string
}

export type CreateMenuSectionRequest = {
  serviceId: number
  title: string
}

export type CreateMenuSectionItemRequest = {
  serviceId: number
  sectionId: number
} & MenuItemType

export type GetSimilarServicesResponse = {
  data: SubCategoryType[]
}

export type GetSimilarServicesRequest = {
  id: number
  serviceId: number
}

export type GetJobsResponse = {
  page: number
  perPage: number
  total: number
  data: JobType[]
}

export type PatchProsServiceCategoriesFoodCategoriesRequest = {
  serviceId: number
  foodCategories: string[]
}

export type PatchProsServiceCategoriesFoodDeliveryChargeRequest = {
  serviceId: number
  deliveryCharge: number
}

export type DiscountsConfigType = {
  freeDeliveryThreshold?: number | null
  totalOrderValueDiscountRate?: number | null
  totalOrderValueDiscountThreshold?: number | null
}

export type PatchProsServiceCategoriesFoodDiscountsRequest = {
  serviceId: number
  discountsConfig: DiscountsConfigType
}

export type DeleteProsServicesCategoriesMenuSectionRequest = {
  serviceId: number
  sectionId: number
}

export type PostProsServicesCategoriesMenuSectionItemRequest = {
  serviceId: number
  sectionId: number
} & Omit<MenuItemType, "id">

export type DeleteProsServicesCategoriesMenuSectionItemRequest = {
  serviceId: number
  sectionId: number
  menuItemId: number
}

export type PatchProsServicesCategoriesMenuSectionItemRequest = {
  serviceId: number
  sectionId: number
} & Partial<MenuItemType>

export type PostProfilePhotoResponse = {
  id: number
  fileName: string
  extension: string
  originalName: string
  mimeType: string
  storageKey: string
  url: string
}

export type DocumentsRequest = {
  type: "id" | "companyTradeLicense"
  idDocumentData?: IdDocumentData
  tradeLicenseDocumentData?: TradeLicenseDocumentData
  files: DocumentFilesType[]
}

export type DocType = {
  createdAt: string
  files: DocumentFilesType[]
  id: number
  idDocumentData: null | IdDocumentData
  proId: number
  processedAt: null
  processedById: null
  rejectReason: null
  status: "pending" | "active" | "inactive" | "approved" | "rejected"

  tradeLicenseDocumentData?: null
  licenseNumber: string
  registrationDate: string
  trustDocumentData?: {
    expirationDate?: string
    trustProductId?: number
    trustProduct?: {
      id: number
      type: "trust"
      status: "active"
      descriptionEn: string
      pricePerDay: null | number
      pricePerYear: number | null
      maxDiscount: null | number
      startDate: null | number
      expirationDate: null | number
      picture: string
    }
  }
  type: "companyTradeLicense" | "id" | "trust"
}

export type MyDocumentsResponse = DocType[]

export type GetPointsPackagesResponse = {
  page: number
  perPage: number
  total: number
  data: PointsItemPackagesType[]
}

export type PostPointsPackageRequest = {
  pointsAmount: number
  price: number
  description: string
  startDate: string
  expirationDate: string
}

export type DefaultRequest = {
  page: number
  perPage?: number
  sort?: "ASC" | "DESC"
}

export type GetPointsHistoryResponse = {
  page: number
  perPage: number
  total: number
  data: PointsTransactionsHistoryType[]
}

export type GetProductsTrustResponse = {
  page: number
  perPage: number
  total: number
  data: PackageItemType[]
}

export type GetProductsTrustRequest = {
  page: number
  perPage?: number
}

export type PostPaymentsTrustStickersRequest = {
  id: number
  paymentMethod: PaymentMethodType
  photo: string
  issueDate?: string
  note?: string
}

export type PostPaymentsTrustStickersResponse = {
  paymentUrl: string
}

export type GetQuotesResponse = {
  page: number
  perPage: number
  total: number
  data: QuoteItemType[]
}

export type PostPointsPackagesRequest = {
  id: number
  paymentMethod: PaymentMethodType
  mobileWalletIdentifier?: string
}

export type VouchersResponse = {
  data: VouchersAssignmentType[]
}

export type LeadsRequest = {
  page: number
  sort?: "ASC" | "DESC" | "nearest_to_me"
  startDate?: string
  endDate?: string
  keywords?: string
  categoryId?: number
  city?: string
}

export type OpportunitiesRequest = {
  page: number
  sort?: "ASC" | "DESC" | "nearest_to_me"
  keywords?: string
  categoryId?: number
  city?: string
}

export type PostOpportunitiesOfferRequest = {
  jobId: number
  opportunityNotes: string
  ratePerHour: number
}

export type PatchMenuSectionsRequest = {
  id: number
  sections: { sectionId: number; order: number }[]
}

export type TrustStickersResponse = {
  page: number
  perPage: number
  total: number
  data: AvailableTrustStickerType[]
}

export type ProAdditionalDocumentsResponse = ProsServicesCategoriesResponse

export type ProAdditionalDocumentsRequest = {
  additionalDocumentId: number
  files: string[]
  serviceCategoryId: number
}
export type PostNotificationsRegTokenRequest = {
  registrationToken: string
}

export type PostNotificationsRegTokenResponse = {
  id: 1
  userType: "customer" | "pro" | "employee"
  userId: 1
  registrationToken: string
  createdAt: string
}

export type GetNotitficationsResponse = {
  page: number
  perPage: number
  total: number
  data: NotificationsItemType[]
}

export type PatchNotificationsArrRequest = {
  ids: number[]
}

export type GetNotitficationsSettingsResponse = {
  data: NotificationsSettingItemType[]
}

export type PatchNotitficationsSettingsRequest = {
  id: number
  enabled: boolean
}

export type InterviewResponse = {
  assignedAt: string | null
  id: number
  interviewDate: string | null
  notes: string | null
  previousInterview: boolean
  proId: number
  requestedAt: string
  serviceCategoryId: number
  status: "new" | "pending" | "passed" | "failed"
}[]

export type InterviewsResponse = ProsServicesCategoriesResponse

export type InterviewsRequest = {
  serviceCategoryId: number
}

export type SingInGoogleRequest = {
  idToken: string
  userType: "customer" | "pro" | "employee"
}

export type PostSocialGoogleProviderRequest = {
  idToken: string
}

export type PostSocialGoogleProviderResponse = {
  id: number
  email: string
  emailVerified: boolean
}

export type PostRegisterNotificationsDeviceRequest = {
  registrationToken: string
}

export type PostRegisterNotificationsDeviceResponse = {
  id: number
  userType: "customer" | "pro" | "employee"
  userId: number
  registrationToken: string
  createdAt: string
}
