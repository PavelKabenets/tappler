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
  EmailVerifyScreen: "email-verify",
  RegistrationFlowScreen: "registration-flow",
  TermsConditionScreen: "terms-conditions",
  CongratulationScreen: "congratulation",
  PasswordResetScreen: "password-reset",
  RequestAddingServiceScreen: "request-adding-service",
} as const

type valueof<T> = T[keyof T]

export type Routes = valueof<typeof ROUTES>
