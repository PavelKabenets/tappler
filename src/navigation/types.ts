/* eslint-disable @typescript-eslint/no-namespace */
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ROUTES } from "./routes"

import { ServiceCategoryType, SubCategoryType } from "types"

export type RootStackParamList = {
  [ROUTES.HomeScreen]: undefined
  [ROUTES.WelcomeScreen]: undefined
  [ROUTES.FeaturesScreen]: undefined
  [ROUTES.AuthScreen]: undefined
  [ROUTES.LogInScreen]: { viewType: "sign-in" | "sign-up" } | undefined
  [ROUTES.SignUpScreen]: { subItem: SubCategoryType } | undefined
  [ROUTES.SignInEmailScreen]: undefined
  [ROUTES.SignUpEmailScreen]: undefined
  [ROUTES.AllServicesScreen]: undefined
  [ROUTES.ServiceDetailScreen]: { service: ServiceCategoryType }
  [ROUTES.EmailVerifyScreen]: { email: string }
  [ROUTES.RegistrationFlowScreen]: undefined
  [ROUTES.TermsConditionScreen]: undefined
  [ROUTES.CongratulationScreen]: undefined
  [ROUTES.PasswordResetScreen]: undefined
  [ROUTES.RequestAddingServiceScreen]: undefined
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
