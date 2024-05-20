/* eslint-disable @typescript-eslint/no-namespace */
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ROUTES, Routes } from "./routes"

import {
  AddressType,
  IdDocumentData,
  JobType,
  MenuItemType,
  MenuSectionType,
  MyServiceDetailCategorySelectType,
  PlaceOfServiceType,
  ServiceCategoryType,
  SubCategoryType,
  UserType,
} from "types"
import {
  AuthResetConfirmRequest,
  MyDocumentsResponse,
  ProsRegistrationResponse,
  ProsResponse,
  ProsServicesCategoriesResponse,
} from "services"
import { MockSearchItemType } from "data/mockData"
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
  [ROUTES.LeadsScreen]: undefined
  [ROUTES.OpportunitiesScreen]: undefined
  [ROUTES.MessagesScreen]: undefined
  [ROUTES.DashboardScreen]: { userParams: Partial<UserType> } | undefined
  [ROUTES.SettingScreen]: undefined
  [ROUTES.PasswordResetCodeScreen]: { email: string }
  [ROUTES.PasswordChangeScreen]: AuthResetConfirmRequest
  [ROUTES.NotificationsScreen]: undefined
  [ROUTES.ScoreDetailScreen]: { type: "response" | "views" | "review" }
  [ROUTES.MyServicesScreen]: undefined
  [ROUTES.MyServiceDetailScreen]: { service: ProsServicesCategoriesResponse }
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
    | { isBusinnes: boolean; documents?: MyDocumentsResponse }
    | undefined
  [ROUTES.SimilarServiceScreen]: { id: number; serviceId: number }
  [ROUTES.FilterScreen]:
    | {
        selectedCategory?: SubCategoryType
        selectedAddress?: MockSearchItemType
        prevScreen?: Routes
      }
    | undefined
  [ROUTES.FilterCategoriesScreen]: { selectedCategory?: SubCategoryType }
  [ROUTES.FilterCitiesScreen]: { selectedAddress?: MockSearchItemType }
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
    headerTitle: string
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
  [ROUTES.MyPointsScreen]: undefined
  [ROUTES.MyPointsPackagesScreen]: undefined
  [ROUTES.MyPointsVouchers]: undefined
  [ROUTES.MyPointsTransactionsScreen]: undefined
  [ROUTES.AccountUpgradesScreen]: undefined
  [ROUTES.AccountUpgradesSelectOptionsScreen]: undefined
  [ROUTES.MyPerfomanceScreen]: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

export type HomeTabParamList = {
  Popular: undefined
  Latest: undefined
}

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
