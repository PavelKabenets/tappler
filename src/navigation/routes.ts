import TradeLicenseScreen from "screens/dashboardScreens/documentsScreens/TradeLicenseScreen"

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
  LeadsScreen: "leads",
  OpportunitiesScreen: "opportunities",
  MessagesScreen: "messages",
  DashboardScreen: "dashboard",
  SettingScreen: "setting",
  PasswordResetCodeScreen: "password-reset-code",
  PasswordChangeScreen: "password-change",
  NotificationsScreen: "notifications",
  ScoreDetailScreen: "score-detail",
  MyServicesScreen: "my-services",
  MyServiceDetailScreen: "my-services-detail",
  PlaceOfServiceScreen: "place-of-services",
  DeliveryRadiusScreen: "delivery-radius",
  ServiceSetupScreen: "service-setup",
  ServiceSetupFoodScreen: "service-setup-food",
  FoodCategoryScreen: "food-category",
  FoodMenuScreen: "food-menu",
  FoodSectionDetailScreen: "food-section-detail",
  FoodSectionMenuItemDetailScreen: "food-section-menu-detail",
  MyDocumentsScreen: "my-documents",
  MyDocumentsHealthScreen: "my-documents-health",
  SimilarServiceScreen: "similar-service",
  FilterScreen: "filter",
  FilterCategoriesScreen: "filter-categories",
  FilterCitiesScreen: "filter-cities",
  OpportunityDetailScreen: "opportunity-detail",
  FoodDeliveryChargeScreen: "food-delivery-charge",
  FoodDiscountsScreen: "food-discounts",
  TradeLicenseScreen: "trade-license",
  WaitScreen: "wait",
  PreviewScreen: "preview",
  FoodMenuStoreScreen: "food-menu-store",
  InterviewScreen: "interview",
  MyDocumentsBussinessDetailScreen: "my-documents-bussiness-detail",
  MyDocumentsChangePlaceScreen: "my-documents-change-place",
  MyDocumentsIdentityScreen: "my-documents-identity",
  MyDocumentsIDScreen: "my-documents-id",
  CameraScreen: "camera",
  MyDocumentsSelfieScreen: "my-documents-selfie",
  OpportunitiesSendOfferScreen: "opportunities-send-offer",
  MyPointsScreen: "my-points",
  MyPointsPackagesScreen: "my-points-packages",
  MyPointsVouchers: "my-points-vouchers",
  MyPointsTransactionsScreen: "my-points-transactions",
  AccountUpgradesScreen: "account-upgrades",
  AccountUpgradesSelectOptionsScreen: "account-upgrades-select-options",
  MyPerfomanceScreen: "my-perfomance",
  MyAccountScreen: "my-account",
  MyAccountDetailsScreen: "my-account-details",
  MyAccountTypeScreen: "my-account-type",
  MyAccountChangeTypeScreen: "my-account-change-type",
  MyAccountEmailScreen: "my-account-email",
  MyAccountAddressScreen: "my-account-address",
  MyAccountNewAddressScreen: "my-account-new-address",
  MyAccountChangedAddressScreen: "my-account-changed-address",
  MyAccountPhoneNumberScreen: "my-account-phone-number",
  MyAccountChangePasswordScreen: "my-account-change-password",
  MyAccountResetPasswordScreen: "my-account-reset-password",
  MyAccountVerifyMobileNumberScreen: "my-account-verify-mobile-number",
  MyAccountVerifyEmailScreen: "my-account-verify-email",
  MyAccountVerifyPasswordScreen: "my-account-verify-password",
  MyAccountNewPasswordScreen: "my-account-new-password",
  MyProfileScreen: "my-profile",
  MyProfileChooseAccountTypeScreen: "my-profile-choose-account-type",
  MyProfileAboutMeScreen: "my-profile-about-me",
  MyProfileBusinessHoursScreen: "my-profile-business-hours",
  MyProfileQualificationCredentialsScreen:
    "my-profile-qualification-credentials",
  MyProfilePaymentsMethodsScreen: "my-profile-payments-methods",
  MyProfilePhotosOfMyWorksScreen: "my-profile-photos-of-works",
  MyProfileSocialMediaLinksScreen: "my-profile-social-media-links",
  AccountUpgradesFeaturedProScreen: "account-upgrades-featured-pro",
  AccountUpgradesMotivationStickersScreen:
    "account-upgrades-motivation-stickers",
  AccountUpgardesMotivationStickersDetailScreen:
    "account-upgrades-motivation-stickers-detail",
  AccountUpgradesPromoMessageScreen: "account-upgrades-promo-message",
  AccountUpgradesContactDetailsScreen: "account-upgrades-contact-details",
  DoneScreen: "done",
  MainNotificationsScreen: "main-notifications",
  UpdatesNotificationsScreen: "updates-notifications",
  MessagesDetailsScreen: "messages-details",
  ArchivedMessagesScreen: "archived-messages",
  ReviceOfferScreen: "revice-offer",
  DetailsInMessagesScreen: "details-in-messages",
  LostConnectionScreen: "lost-connection",
  AccountUpgradesViewDetailsScreen: "account-upgrades-view-details",
  AccountUpgradesHistoryScreen: "account-upgrades-history",
  AccountUpgradesViewMyProfileScreen: "view-my-profile",
  AccountUpgradesTermsConditionsScreen: "account-upgrades-terms-conditions",
  RequiredDocumentsScreen: "required-documents",
  MyServiceDetailPhotosScreen: "my-service-detail-photos",
  MyServiceDetailDocumentsScreen: "my-service-detail-documents",
  TrustStickersIndividualScreen: "trust-stickers-individual",
  MyServiceQualificationCredentialsScreen: "my-service-qualification-credentials",
  MyServiceDocumentsStatusScreen: "my-service-detail-documents-status",
  MyServiceResubmitDocumentsScreen: "my-service-resubmit-screen",
} as const

type valueof<T> = T[keyof T]

export type Routes = valueof<typeof ROUTES>
