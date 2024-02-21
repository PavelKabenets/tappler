export const ROUTES = {
  HomeScreen: "home",
  WelcomeScreen: "welcome",
  FeaturesScreen: "features",
  AuthScreen: "auth",
  LogInScreen: "log-in",
  SignUpScreen: "sign-up",
  SignInEmailScreen: "sign-in-email",
  SignUpEmailScreen: "sign-up-email",
  AllServicesScreen: "all-services",
  ServiceDetailScreen: "service-detail",
  UpdateEmailScreen: "update-email",
  RegistrationFlowScreen: "registration-flow",
} as const

type valueof<T> = T[keyof T]

export type Routes = valueof<typeof ROUTES>
