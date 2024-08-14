/* eslint-disable @typescript-eslint/no-namespace */
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ROUTES, Routes } from "./routes"

import {
  AdditionalDocumentType,
  AddressType,
  IdDocumentData,
  JobType,
  MenuItemType,
  MenuSectionType,
  MyServiceDetailCategorySelectType,
  NewAddressDataType,
  NotificationsItemType,
  PlaceOfServiceType,
  ProAdditionalDocumentsType,
  ProfileSettingParamTypes,
  ServiceCategoryType,
  SubCategoryType,
  UserType,
} from "types"
import {
  AuthResetConfirmRequest,
  GetPointsHistoryResponse,
  MyDocumentsResponse,
  ProsRegistrationResponse,
  ProsResponse,
  ProsServicesCategoriesResponse,
} from "services"
import {
  MockMainNotificationsDataItemType,
  MockMessagesDataItemType,
  MockSearchItemType,
  MockSubscriptionDetailsDataItemType,
  mockServicesDataItemType,
} from "data/mockData"
import { ImageOrVideo } from "react-native-image-crop-picker"

export type RootStackParamList = {
  [ROUTES.HomeScreen]: { userParams: Partial<UserType> } | undefined
  [ROUTES.WelcomeScreen]: undefined
  [ROUTES.FeaturesScreen]: undefined
  [ROUTES.AuthScreen]: undefined
  [ROUTES.LogInScreen]: { viewType: "sign-in" | "sign-up" } | undefined
  [ROUTES.SignUpScreen]: { subItem: SubCategoryType } | undefined
  [ROUTES.SignInEmailScreen]: undefined
  [ROUTES.SignUpEmailScreen]: undefined
  [ROUTES.AllServicesScreen]:
    | {
        type: "my-service"
        myServicesCategoriesData?: ProsServicesCategoriesResponse[]
      }
    | undefined
  [ROUTES.ServiceDetailScreen]:
    | { service: ServiceCategoryType }
    | MyServiceDetailCategorySelectType
  [ROUTES.EmailVerifyScreen]: { email: string }
  [ROUTES.RegistrationFlowScreen]: undefined
  [ROUTES.TermsConditionScreen]: undefined
  [ROUTES.CongratulationScreen]: undefined
  [ROUTES.PasswordResetScreen]: undefined
  [ROUTES.RequestAddingServiceScreen]: undefined
  [ROUTES.LeadsScreen]:
    | {
        selectedCategory?: SubCategoryType
        selectedAddress?: MockSearchItemType
        startDate?: string
        endDate?: string
        keyword?: string
      }
    | undefined
  [ROUTES.OpportunitiesScreen]:
    | {
        selectedCategory?: SubCategoryType
        selectedAddress?: MockSearchItemType
        keyword?: string
      }
    | undefined
  [ROUTES.MessagesScreen]: undefined
  [ROUTES.DashboardScreen]: { userParams: Partial<UserType> } | undefined
  [ROUTES.SettingScreen]: undefined
  [ROUTES.PasswordResetCodeScreen]: { email: string }
  [ROUTES.PasswordChangeScreen]: AuthResetConfirmRequest
  [ROUTES.NotificationsScreen]: undefined
  [ROUTES.ScoreDetailScreen]: { type: "response" | "views" | "review" }
  [ROUTES.MyServicesScreen]: undefined
  [ROUTES.MyServiceDetailScreen]: {
    service: ProsServicesCategoriesResponse
    isFirstOpen?: boolean
  }
  [ROUTES.PlaceOfServiceScreen]:
    | { service: ProsServicesCategoriesResponse }
    | {
        service: ProsServicesCategoriesResponse
        placeOfService?: PlaceOfServiceType
      }
  [ROUTES.DeliveryRadiusScreen]: {
    service: ProsServicesCategoriesResponse
    placeOfService: PlaceOfServiceType
  }
  [ROUTES.ServiceSetupScreen]: { service: ProsServicesCategoriesResponse }
  [ROUTES.ServiceSetupFoodScreen]: { service: ProsServicesCategoriesResponse }
  [ROUTES.FoodCategoryScreen]: { service: ProsServicesCategoriesResponse }
  [ROUTES.FoodMenuScreen]: { service: ProsServicesCategoriesResponse }
  [ROUTES.FoodSectionDetailScreen]: {
    service: ProsServicesCategoriesResponse
    currentSection: MenuSectionType
  }
  [ROUTES.FoodSectionMenuItemDetailScreen]: {
    service: ProsServicesCategoriesResponse
    menuItem?: MenuItemType
    currentSection: MenuSectionType
  }
  [ROUTES.MyDocumentsScreen]: { documents?: MyDocumentsResponse }
  [ROUTES.MyDocumentsHealthScreen]:
    | {
        isBusinnes: boolean
        documents?: MyDocumentsResponse
        isFingerPrint?: boolean
      }
    | undefined
  [ROUTES.SimilarServiceScreen]: { id: number; serviceId: number }
  [ROUTES.FilterScreen]:
    | {
        selectedCategory?: SubCategoryType
        selectedAddress?: MockSearchItemType
        startDate?: string
        endDate?: string
        keyword?: string
        prevScreen?: Routes
        isLeads?: boolean
      }
    | undefined
  [ROUTES.FilterCategoriesScreen]: {
    selectedCategory?: SubCategoryType
    isLeads?: boolean
  }
  [ROUTES.FilterCitiesScreen]: {
    selectedAddress?: MockSearchItemType
    isLeads?: boolean
  }
  [ROUTES.OpportunityDetailScreen]: { job: JobType }
  [ROUTES.FoodDeliveryChargeScreen]: { service: ProsServicesCategoriesResponse }
  [ROUTES.FoodDiscountsScreen]: { service: ProsServicesCategoriesResponse }
  [ROUTES.TradeLicenseScreen]: undefined
  [ROUTES.WaitScreen]: {
    documents?: MyDocumentsResponse
    title?: string
    descr?: string
    startHours?: number
    endHours?: number
    headerTitle?: string
    noneBorder?: boolean
    isBorder?: boolean
    text13?: boolean
    onPressBack?: () => void
    customTimeTitle?: string
  }
  [ROUTES.PreviewScreen]: { menuItem: MenuItemType }
  [ROUTES.FoodMenuStoreScreen]: { service: ProsServicesCategoriesResponse }
  [ROUTES.InterviewScreen]: { service: ProsServicesCategoriesResponse }
  [ROUTES.MyDocumentsBussinessDetailScreen]: { address: AddressType }
  [ROUTES.MyDocumentsChangePlaceScreen]: { address: AddressType }
  [ROUTES.MyDocumentsIdentityScreen]: undefined
  [ROUTES.MyDocumentsIDScreen]:
    | { frontPhoto?: string; backPhoto?: string }
    | undefined
  [ROUTES.CameraScreen]: { type: "front" | "back" | "selfie" }
  [ROUTES.MyDocumentsSelfieScreen]: {
    idDocumentData?: IdDocumentData
    frontPhoto?: string
    backPhoto?: string
    selfiePhoto?: string
  }
  [ROUTES.OpportunitiesSendOfferScreen]: { job: JobType }
  [ROUTES.MyPointsScreen]: { data?: GetPointsHistoryResponse } | undefined
  [ROUTES.MyPointsPackagesScreen]: undefined
  [ROUTES.MyPointsVouchers]: undefined
  [ROUTES.MyPointsTransactionsScreen]: { data?: GetPointsHistoryResponse }
  [ROUTES.AccountUpgradesScreen]: undefined
  [ROUTES.AccountUpgradesSelectOptionsScreen]: undefined
  [ROUTES.MyPerfomanceScreen]: undefined
  [ROUTES.MyAccountScreen]: { isSuccessModalVisible: boolean } | undefined
  [ROUTES.MyAccountDetailsScreen]: undefined
  [ROUTES.MyAccountTypeScreen]: undefined
  [ROUTES.MyAccountChangeTypeScreen]: undefined
  [ROUTES.MyAccountEmailScreen]: { isSuccessModalVisible: boolean } | undefined
  [ROUTES.MyAccountAddressScreen]: { data: NewAddressDataType } | undefined
  [ROUTES.MyAccountNewAddressScreen]:
    | { data: NewAddressDataType; onSubmitGoBack?: boolean }
    | undefined
  [ROUTES.MyAccountChangedAddressScreen]:
    | { data: NewAddressDataType }
    | undefined
  [ROUTES.MyAccountPhoneNumberScreen]:
    | { isSuccessModalVisible: boolean }
    | undefined
  [ROUTES.MyAccountChangePasswordScreen]: undefined
  [ROUTES.MyAccountResetPasswordScreen]: undefined
  [ROUTES.MyAccountVerifyMobileNumberScreen]: { phone: string }
  [ROUTES.MyAccountVerifyEmailScreen]: undefined
  [ROUTES.MyAccountVerifyPasswordScreen]: undefined
  [ROUTES.MyAccountNewPasswordScreen]: undefined
  [ROUTES.MyProfileScreen]: { profileParams: ProfileSettingParamTypes }
  [ROUTES.MyProfileChooseAccountTypeScreen]: {
    profileParams: ProfileSettingParamTypes
  }
  [ROUTES.MyProfileAboutMeScreen]: { profileParams: ProfileSettingParamTypes }
  [ROUTES.MyProfileBusinessHoursScreen]: {
    profileParams: ProfileSettingParamTypes
  }
  [ROUTES.MyProfileQualificationCredentialsScreen]: {
    profileParams: ProfileSettingParamTypes
  }
  [ROUTES.MyProfilePaymentsMethodsScreen]: {
    profileParams: ProfileSettingParamTypes
  }
  [ROUTES.MyProfilePhotosOfMyWorksScreen]: {
    profileParams: ProfileSettingParamTypes
  }
  [ROUTES.MyProfileSocialMediaLinksScreen]: {
    profileParams: ProfileSettingParamTypes
  }
  [ROUTES.AccountUpgradesFeaturedProScreen]: undefined
  [ROUTES.AccountUpgradesMotivationStickersScreen]: undefined
  [ROUTES.AccountUpgardesMotivationStickersDetailScreen]: undefined
  [ROUTES.AccountUpgradesPromoMessageScreen]: undefined
  [ROUTES.AccountUpgradesContactDetailsScreen]: undefined
  [ROUTES.DoneScreen]: {
    nextScreenName: Routes
    nextScreenParams?: ParamsFor<keyof RootStackParamList>
  }
  [ROUTES.MainNotificationsScreen]: undefined
  [ROUTES.UpdatesNotificationsScreen]: {
    notifications: NotificationsItemType
  }
  [ROUTES.MessagesDetailsScreen]: { messages: MockMessagesDataItemType }
  [ROUTES.ArchivedMessagesScreen]: undefined
  [ROUTES.ReviceOfferScreen]: { messages: MockMessagesDataItemType }
  [ROUTES.DetailsInMessagesScreen]: undefined
  [ROUTES.LostConnectionScreen]: undefined
  [ROUTES.AccountUpgradesViewDetailsScreen]: {
    subscription: MockSubscriptionDetailsDataItemType
    resultCost?: number
  }
  [ROUTES.AccountUpgradesHistoryScreen]: undefined
  [ROUTES.AccountUpgradesViewMyProfileScreen]: undefined
  [ROUTES.AccountUpgradesTermsConditionsScreen]: undefined
  [ROUTES.MyServiceDetailPhotosScreen]: {
    service: ProsServicesCategoriesResponse
  }
  [ROUTES.MyServiceDetailDocumentsScreen]: {
    service: ProsServicesCategoriesResponse
  }
  [ROUTES.MyServiceQualificationCredentialsScreen]: {
    service: ProsServicesCategoriesResponse
  }
  [ROUTES.TrustStickersIndividualScreen]: { type: "fingerpringts" | "health" }
  [ROUTES.MyServiceDocumentsStatusScreen]: {
    service: ProsServicesCategoriesResponse
  }
  [ROUTES.MyServiceResubmitDocumentsScreen]: {
    service: ProsServicesCategoriesResponse
    document: ProAdditionalDocumentsType
  }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

export type HomeTabParamList = {
  Popular: undefined
  Latest: undefined
}

type ParamsFor<T extends keyof RootStackParamList> =
  RootStackParamList[T] extends undefined ? undefined : RootStackParamList[T]

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
