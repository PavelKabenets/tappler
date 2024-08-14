import React, { useEffect } from "react"

import { NavigationContainer } from "@react-navigation/native"
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"

import { ROUTES, Routes } from "./routes"
import HomeScreen from "screens/dashboardScreens/HomeScreen"
import WelcomeScreen from "screens/onboardingScreens/WelcomeScreen"
import FeaturesScreen from "screens/onboardingScreens/FeaturesScreen"
import AuthScreen from "screens/onboardingScreens/AuthScreen"
import SignUpScreen from "screens/onboardingScreens/SignUpScreen"
import LogInScreen from "screens/onboardingScreens/LogInScreen"
import SignInEmailScreen from "screens/onboardingScreens/SignInEmailScreen"
import SignUpEmailScreen from "screens/onboardingScreens/SignUpEmailScreen"
import AllServicesScreen from "screens/onboardingScreens/AllServicesScreen"
import ServiceDetailScreen from "screens/onboardingScreens/ServiceDetailScreen"
import EmailVerifyScreen from "screens/onboardingScreens/EmailVerifyScreen"
import RegistrationFlowScreen from "screens/onboardingScreens/RegistrationFlowScreen"
import TermsConditionScreen from "screens/onboardingScreens/TermsConditionScreen"
import CongratulationScreen from "screens/onboardingScreens/CongratulationScreen"
import PasswordResetScreen from "screens/onboardingScreens/PasswordResetScreen"
import RequestAddingServiceScreen from "screens/onboardingScreens/RequestAddingServiceScreen"
import { useTypedSelector } from "store"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import {
  setCurrentScreen,
  setLoadingModalVisible,
  setLogout,
} from "store/auth/slice"
import { I18nManager } from "react-native"
import LeadsScreen from "screens/dashboardScreens/LeadsScreen"
import OpportunitiesScreen from "screens/dashboardScreens/opportunitiesScreens/OpportunitiesScreen"
import MessagesScreen from "screens/dashboardScreens/MessagesScreens/MessagesScreen"
import RenderTabBarIcon from "components/RenderTabBarIcon"
import TabBar from "components/TabBar"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import SettingScreen from "screens/dashboardScreens/SettingScreen"
import PasswordResetCodeScreen from "screens/onboardingScreens/PasswordResetCodeScreen"
import PasswordChangeScreen from "screens/onboardingScreens/PasswordChangeScreen"
import NotificationsScreen from "screens/dashboardScreens/NotificationsScreen"
import ScoreDetailScreen from "screens/dashboardScreens/ScoreDetailScreen"
import MyServicesScreen from "screens/dashboardScreens/MyServicesScreen"
import MyServiceDetailScreen from "screens/dashboardScreens/MyServiceDetailScreen"
import PlaceOfServiceScreen from "screens/dashboardScreens/PlaceOfServiceScreen"
import DeliveryRadiusScreen from "screens/dashboardScreens/DeliveryRadiusScreen"
import ServiceSetupScreen from "screens/dashboardScreens/ServiceSetupScreen"
import ServiceSetupFoodScreen from "screens/dashboardScreens/ServiceSetupFoodScreen"
import FoodMenuScreen from "screens/dashboardScreens/foodScreens/FoodMenuScreen"
import FoodSectionDetailScreen from "screens/dashboardScreens/foodScreens/FoodSectionDetailScreen"
import FoodCategoryScreen from "screens/dashboardScreens/foodScreens/FoodCategoryScreen"
import FoodSectionMenuItemDetailScreen from "screens/dashboardScreens/foodScreens/FoodSectionMenuItemDetailScreen"
import MyDocumentsScreen from "screens/dashboardScreens/documentsScreens/MyDocumentsScreen"
import MyDocumentsHealthScreen from "screens/dashboardScreens/documentsScreens/MyDocumentsHealthScreen"
import SimilarServiceScreen from "screens/dashboardScreens/SimilarServiceScreen"
import FilterScreen from "screens/dashboardScreens/filterScreens/FilterScreen"
import FilterCategoriesScreen from "screens/dashboardScreens/filterScreens/FilterCategoriesScreen"
import FilterCitiesScreen from "screens/dashboardScreens/filterScreens/FilterCitiesScreen"
import OpportunityDetailScreen from "screens/dashboardScreens/opportunitiesScreens/OpportunityDetailScreen"
import FoodDeliveryChargeScreen from "screens/dashboardScreens/foodScreens/FoodDeliveryChargeScreen"
import FoodDiscountsScreen from "screens/dashboardScreens/foodScreens/FoodDiscountsScreen"
import { RootStackScreenProps } from "./types"
import TradeLicenseScreen from "screens/dashboardScreens/documentsScreens/TradeLicenseScreen"
import WaitScreen from "screens/dashboardScreens/WaitScreen"
import PreviewScreen from "screens/dashboardScreens/foodScreens/PreviewScreen"
import FoodMenuStoreScreen from "screens/dashboardScreens/foodScreens/FoodMenuStoreScreen"
import InterviewScreen from "screens/dashboardScreens/InterviewScreen"
import MyDocumentsBussinessDetailScreen from "screens/dashboardScreens/documentsScreens/MyDocumentsBussinessDetailScreen"
import MyDocumentsChangePlaceScreen from "screens/dashboardScreens/documentsScreens/MyDocumentsChangePlaceScreen"
import MyDocumentsIdentityScreen from "screens/dashboardScreens/documentsScreens/MyDocumentsIdentityScreen"
import MyDocumentsIDScreen from "screens/dashboardScreens/documentsScreens/MyDocumentsIDScreen"
import CameraScreen from "screens/dashboardScreens/CameraScreen"
import MyDocumentsSelfieScreen from "screens/dashboardScreens/documentsScreens/MyDocumentsSelfieScreen"
import OpportunitiesSendOfferScreen from "screens/dashboardScreens/opportunitiesScreens/OpportunitiesSendOfferScreen"
import MyPointsScreen from "screens/dashboardScreens/pointsScreens/MyPointsScreen"
import MyPointsPackagesScreen from "screens/dashboardScreens/pointsScreens/MyPointsPackagesScreen"
import MyPointsVouchers from "screens/dashboardScreens/pointsScreens/MyPointsVouchers"
import MyPointsTransactionsScreen from "screens/dashboardScreens/pointsScreens/MyPointsTransactionsScreen"
import AccountUpgradesScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgradesScreen"
import AccountUpgradesSelectOptionsScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgradesSelectOptionsScreen"
import MyPerfomanceScreen from "screens/dashboardScreens/MyPerfomanceScreen"
import MyAccountScreen from "screens/dashboardScreens/myAccountScreens/MyAccountScreen"
import MyAccountEmailScreen from "screens/dashboardScreens/myAccountScreens/MyAccountEmailScreen"
import MyAccountAddressScreen from "screens/dashboardScreens/myAccountScreens/MyAccountAddressScreen"
// import MyAccountTypeScreen from "screens/dashboardScreens/myAccountScreens/MyAccountTypeScreen"
import MyAccountPhoneNumberScreen from "screens/dashboardScreens/myAccountScreens/MyAccountPhoneNumberScreen"
import MyAccountChangePasswordScreen from "screens/dashboardScreens/myAccountScreens/MyAccountChangePasswordScreen"
import MyAccountResetPasswordScreen from "screens/dashboardScreens/myAccountScreens/MyAccountResetPasswordScreen"
import MyAccountNewAddressScreen from "screens/dashboardScreens/myAccountScreens/MyAccountNewAddressScreen"
import MyAccountChangedAddressScreen from "screens/dashboardScreens/myAccountScreens/MyAccountChangedAddressScreen"
import MyAccountVerifyMobileNumberScreen from "screens/dashboardScreens/myAccountScreens/MyAccountVerifyMobileNumberScreen"
import MyAccountVerifyEmailScreen from "screens/dashboardScreens/myAccountScreens/MyAccountVerifyEmailScreen"
import MyAccountVerifyPasswordScreen from "screens/dashboardScreens/myAccountScreens/MyAccountVerifyPasswordScreen"
import MyAccountNewPasswordScreen from "screens/dashboardScreens/myAccountScreens/MyAccountNewPasswordScreen"
import MyProfileScreen from "screens/dashboardScreens/MyProfileScreens/MyProfileScreen"
import MyProfileChooseAccountTypeScreen from "screens/dashboardScreens/MyProfileScreens/MyProfileChooseAccountTypeScreen"
import MyProfileAboutMeScreen from "screens/dashboardScreens/MyProfileScreens/MyProfileAboutMeScreen"
import MyProfileBusinessHoursScreen from "screens/dashboardScreens/MyProfileScreens/MyProfileBusinessHoursScreen"
import MyProfileQualificationCredentialsScreen from "screens/dashboardScreens/MyProfileScreens/MyProfileQualificationCredentialsScreen"
import MyProfilePaymentsMethodsScreen from "screens/dashboardScreens/MyProfileScreens/MyProfilePaymentsMethodsScreen"
import MyProfilePhotosOfMyWorksScreen from "screens/dashboardScreens/MyProfileScreens/MyProfilePhotosOfMyWorksScreen"
import MyProfileSocialMediaLinksScreen from "screens/dashboardScreens/MyProfileScreens/MyProfileSocialMediaLinksScreen"
import AccountUpgradesFeaturedProScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgradesFeaturedProScreen"
import AccountUpgradesMotivationStickersScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgradesMotivationStickersScreen"
import { api } from "services/api"
import AccountUpgardesMotivationStickersDetailScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgardesMotivationStickersDetailScreen"
import AccountUpgradesPromoMessageScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgradesPromoMessageScreen"
import AccountUpgradesContactDetailsScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgradesContactDetailsScreen"
import DoneScreen from "screens/dashboardScreens/DoneScreen"
import MainNotificationsScreen from "screens/dashboardScreens/MainNotificationsScreens/MainNotificationsScreen"
import UpdatesNotificationsScreen from "screens/dashboardScreens/MainNotificationsScreens/UpdatesNotificationsScreen"
import MessagesDetailsScreen from "screens/dashboardScreens/MessagesScreens/MessagesDetailsScreen"
import ArchivedMessagesScreen from "screens/dashboardScreens/MessagesScreens/ArchivedMessagesScreen"
import ReviceOfferScreen from "screens/dashboardScreens/MessagesScreens/ReviceOfferScreen"
import DetailsInMessagesScreen from "screens/dashboardScreens/MessagesScreens/DetailsInMessagesScreen"
import { useNetInfoInstance } from "@react-native-community/netinfo"
import LostConnectionScreen from "screens/dashboardScreens/LostConnectionScreen"
import AccountUpgradesViewDetailsScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgradesViewDetailsScreen"
import AccountUpgradesHistoryScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgradesHistoryScreen"
import AccountUpgradesViewMyProfileScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgradesViewMyProfileScreen"
import AccountUpgradesTermsConditionsScreen from "screens/dashboardScreens/accountUpgradesScreens/AccountUpgradesTermsConditionsScreen"
import MyAccountDetailsScreen from "screens/dashboardScreens/myAccountScreens/MyAccountDetailsScreen"
import MyAccountTypeScreen from "screens/dashboardScreens/myAccountScreens/MyAccountTypeScreen"
import MyAccountChangeTypeScreen from "screens/dashboardScreens/myAccountScreens/MyAccountChangeTypeScreen"
import MyServiceDetailPhotosScreen from "screens/dashboardScreens/MyServiceDetailPhotosScreen"
import MyServiceDetailDocumentsScreen from "screens/dashboardScreens/MyServiceDetailDocumentsScreen"
import TrustStickersIndividualScreen from "screens/dashboardScreens/documentsScreens/TrustStickersIndividualScreen"
import MyServiceQualificationCredentialsScreen from "screens/dashboardScreens/MyServiceQualificationCredentialsScreen"
import MyServiceDocumentsStatusScreen from "screens/dashboardScreens/MyServiceDocumentsStatusScreen"
import MyServiceResubmitDocumentsScreen from "screens/dashboardScreens/MyServiceResubmitDocumentsScreen"

const NavigationStack = createNativeStackNavigator()
const NavigationTab = createBottomTabNavigator()

const animationSlideFromDown: NativeStackNavigationOptions = {
  animation: "slide_from_bottom",
}

const defaultAnim: NativeStackNavigationOptions = {
  animation: I18nManager.isRTL ? "slide_from_left" : "slide_from_right",
}

type Props = RootStackScreenProps<"dashboard">

const TabNavigator: React.FC<Props> = ({ route }) => {
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const userParams = route.params?.userParams
  return (
    <NavigationTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <TabBar {...props} t={t} />}
    >
      <NavigationTab.Screen
        component={HomeScreen as React.FC}
        name={ROUTES.HomeScreen}
        initialParams={{ userParams }}
        options={{
          tabBarIcon: ({ focused }) => (
            <RenderTabBarIcon focused={focused} type="home" />
          ),
        }}
      />
      <NavigationTab.Screen
        component={LeadsScreen as React.FC}
        name={ROUTES.LeadsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <RenderTabBarIcon focused={focused} type="leads" />
          ),
        }}
      />
      <NavigationTab.Screen
        component={OpportunitiesScreen as React.FC}
        name={ROUTES.OpportunitiesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <RenderTabBarIcon focused={focused} type="opportunities" />
          ),
        }}
      />
      <NavigationTab.Screen
        component={MessagesScreen as React.FC}
        name={ROUTES.MessagesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <RenderTabBarIcon focused={focused} type="messages" />
          ),
        }}
      />
    </NavigationTab.Navigator>
  )
}

const Navigator = ({
  isAuth,
  isRegistrationFlowComleted,
}: {
  isAuth: boolean
  isRegistrationFlowComleted: boolean
}) => {
  const navigation = useNavigation()
  const { i18n } = useTranslation()
  const {
    netInfo: { type, isConnected },
    refresh,
  } = useNetInfoInstance()

  const dispatch = useDispatch()
  const { currentScreen, isLogout, isLoadingModalVisible } = useTypedSelector((store) => store.auth)
  useEffect(() => {
    if (currentScreen) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigation.navigate(currentScreen)
    }
    setTimeout(() => {
      dispatch(setCurrentScreen(undefined))
    }, 1000)
  }, [])

  useEffect(() => {
    if (isLogout) {
      if (!isLoadingModalVisible) {
        dispatch(setLoadingModalVisible(true))
      }
      setTimeout(() => {
        dispatch(setLoadingModalVisible(false))
      }, 2600)
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "auth" }],
        })
        dispatch(api.util.resetApiState())
      }, 3000)
    }
  }, [isLogout])

  useEffect(() => {
    if (isConnected === false) {
      navigation.navigate("lost-connection")
    }
  }, [isConnected])

  return (
    <NavigationStack.Navigator
      initialRouteName={
        isAuth
          ? isRegistrationFlowComleted
            ? ROUTES.DashboardScreen
            : ROUTES.RegistrationFlowScreen
          : currentScreen || ROUTES.WelcomeScreen
      }
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <NavigationStack.Screen
        component={HomeScreen as React.FC}
        name={ROUTES.HomeScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={WelcomeScreen as React.FC}
        name={ROUTES.WelcomeScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={FeaturesScreen as React.FC}
        name={ROUTES.FeaturesScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={AuthScreen as React.FC}
        name={ROUTES.AuthScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={SignUpScreen as React.FC}
        name={ROUTES.SignUpScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={LogInScreen as React.FC}
        name={ROUTES.LogInScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={SignInEmailScreen as React.FC}
        name={ROUTES.SignInEmailScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={SignUpEmailScreen as React.FC}
        name={ROUTES.SignUpEmailScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={EmailVerifyScreen as React.FC}
        name={ROUTES.EmailVerifyScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={RegistrationFlowScreen as React.FC}
        name={ROUTES.RegistrationFlowScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={AllServicesScreen as React.FC}
        name={ROUTES.AllServicesScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={PasswordResetCodeScreen as React.FC}
        name={ROUTES.PasswordResetCodeScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={ServiceDetailScreen as React.FC}
        name={ROUTES.ServiceDetailScreen}
        options={defaultAnim}
      />

      <NavigationStack.Screen
        component={TermsConditionScreen as React.FC}
        name={ROUTES.TermsConditionScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={CongratulationScreen as React.FC}
        name={ROUTES.CongratulationScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={PasswordResetScreen as React.FC}
        name={ROUTES.PasswordResetScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={RequestAddingServiceScreen as React.FC}
        name={ROUTES.RequestAddingServiceScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={TabNavigator as React.FC}
        name={ROUTES.DashboardScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={SettingScreen as React.FC}
        name={ROUTES.SettingScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={PasswordChangeScreen as React.FC}
        name={ROUTES.PasswordChangeScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={NotificationsScreen as React.FC}
        name={ROUTES.NotificationsScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={ScoreDetailScreen as React.FC}
        name={ROUTES.ScoreDetailScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyServicesScreen as React.FC}
        name={ROUTES.MyServicesScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyServiceDetailScreen as React.FC}
        name={ROUTES.MyServiceDetailScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={PlaceOfServiceScreen as React.FC}
        name={ROUTES.PlaceOfServiceScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={DeliveryRadiusScreen as React.FC}
        name={ROUTES.DeliveryRadiusScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={ServiceSetupScreen as React.FC}
        name={ROUTES.ServiceSetupScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={ServiceSetupFoodScreen as React.FC}
        name={ROUTES.ServiceSetupFoodScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={FoodCategoryScreen as React.FC}
        name={ROUTES.FoodCategoryScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={FoodMenuScreen as React.FC}
        name={ROUTES.FoodMenuScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={FoodSectionDetailScreen as React.FC}
        name={ROUTES.FoodSectionDetailScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={FoodSectionMenuItemDetailScreen as React.FC}
        name={ROUTES.FoodSectionMenuItemDetailScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyDocumentsScreen as React.FC}
        name={ROUTES.MyDocumentsScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyDocumentsHealthScreen as React.FC}
        name={ROUTES.MyDocumentsHealthScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={SimilarServiceScreen as React.FC}
        name={ROUTES.SimilarServiceScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={FilterScreen as React.FC}
        name={ROUTES.FilterScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={FilterCategoriesScreen as React.FC}
        name={ROUTES.FilterCategoriesScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={FilterCitiesScreen as React.FC}
        name={ROUTES.FilterCitiesScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={OpportunityDetailScreen as React.FC}
        name={ROUTES.OpportunityDetailScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={FoodDeliveryChargeScreen as React.FC}
        name={ROUTES.FoodDeliveryChargeScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={FoodDiscountsScreen as React.FC}
        name={ROUTES.FoodDiscountsScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={TradeLicenseScreen as React.FC}
        name={ROUTES.TradeLicenseScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={WaitScreen as React.FC}
        name={ROUTES.WaitScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={PreviewScreen as React.FC}
        name={ROUTES.PreviewScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={FoodMenuStoreScreen as React.FC}
        name={ROUTES.FoodMenuStoreScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={InterviewScreen as React.FC}
        name={ROUTES.InterviewScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyDocumentsBussinessDetailScreen as React.FC}
        name={ROUTES.MyDocumentsBussinessDetailScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyDocumentsChangePlaceScreen as React.FC}
        name={ROUTES.MyDocumentsChangePlaceScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyDocumentsIdentityScreen as React.FC}
        name={ROUTES.MyDocumentsIdentityScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyDocumentsIDScreen as React.FC}
        name={ROUTES.MyDocumentsIDScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={CameraScreen as React.FC}
        name={ROUTES.CameraScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyDocumentsSelfieScreen as React.FC}
        name={ROUTES.MyDocumentsSelfieScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={OpportunitiesSendOfferScreen as React.FC}
        name={ROUTES.OpportunitiesSendOfferScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyPointsScreen as React.FC}
        name={ROUTES.MyPointsScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyPointsPackagesScreen as React.FC}
        name={ROUTES.MyPointsPackagesScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyPointsVouchers as React.FC}
        name={ROUTES.MyPointsVouchers}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyPointsTransactionsScreen as React.FC}
        name={ROUTES.MyPointsTransactionsScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={AccountUpgradesScreen as React.FC}
        name={ROUTES.AccountUpgradesScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={AccountUpgradesSelectOptionsScreen as React.FC}
        name={ROUTES.AccountUpgradesSelectOptionsScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyPerfomanceScreen as React.FC}
        name={ROUTES.MyPerfomanceScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyAccountScreen as React.FC}
        name={ROUTES.MyAccountScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyAccountDetailsScreen as React.FC}
        name={ROUTES.MyAccountDetailsScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyAccountTypeScreen as React.FC}
        name={ROUTES.MyAccountTypeScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyAccountChangeTypeScreen as React.FC}
        name={ROUTES.MyAccountChangeTypeScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyAccountEmailScreen as React.FC}
        name={ROUTES.MyAccountEmailScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyAccountAddressScreen as React.FC}
        name={ROUTES.MyAccountAddressScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyAccountNewAddressScreen as React.FC}
        name={ROUTES.MyAccountNewAddressScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyAccountChangedAddressScreen as React.FC}
        name={ROUTES.MyAccountChangedAddressScreen}
      />
      <NavigationStack.Screen
        component={MyAccountPhoneNumberScreen as React.FC}
        name={ROUTES.MyAccountPhoneNumberScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyAccountChangePasswordScreen as React.FC}
        name={ROUTES.MyAccountChangePasswordScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyAccountResetPasswordScreen as React.FC}
        name={ROUTES.MyAccountResetPasswordScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyAccountVerifyMobileNumberScreen as React.FC}
        name={ROUTES.MyAccountVerifyMobileNumberScreen}
      />
      <NavigationStack.Screen
        component={MyAccountVerifyEmailScreen as React.FC}
        name={ROUTES.MyAccountVerifyEmailScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyAccountVerifyPasswordScreen as React.FC}
        name={ROUTES.MyAccountVerifyPasswordScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyAccountNewPasswordScreen as React.FC}
        name={ROUTES.MyAccountNewPasswordScreen}
      />
      <NavigationStack.Screen
        component={MyProfileScreen as React.FC}
        name={ROUTES.MyProfileScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyProfileChooseAccountTypeScreen as React.FC}
        name={ROUTES.MyProfileChooseAccountTypeScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyProfileAboutMeScreen as React.FC}
        name={ROUTES.MyProfileAboutMeScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyProfileBusinessHoursScreen as React.FC}
        name={ROUTES.MyProfileBusinessHoursScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyProfileQualificationCredentialsScreen as React.FC}
        name={ROUTES.MyProfileQualificationCredentialsScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyProfilePaymentsMethodsScreen as React.FC}
        name={ROUTES.MyProfilePaymentsMethodsScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyProfilePhotosOfMyWorksScreen as React.FC}
        name={ROUTES.MyProfilePhotosOfMyWorksScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyProfileSocialMediaLinksScreen as React.FC}
        name={ROUTES.MyProfileSocialMediaLinksScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={AccountUpgradesFeaturedProScreen as React.FC}
        name={ROUTES.AccountUpgradesFeaturedProScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={AccountUpgradesMotivationStickersScreen as React.FC}
        name={ROUTES.AccountUpgradesMotivationStickersScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={AccountUpgardesMotivationStickersDetailScreen as React.FC}
        name={ROUTES.AccountUpgardesMotivationStickersDetailScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={AccountUpgradesPromoMessageScreen as React.FC}
        name={ROUTES.AccountUpgradesPromoMessageScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={AccountUpgradesContactDetailsScreen as React.FC}
        name={ROUTES.AccountUpgradesContactDetailsScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={DoneScreen as React.FC}
        name={ROUTES.DoneScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MainNotificationsScreen as React.FC}
        name={ROUTES.MainNotificationsScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={UpdatesNotificationsScreen as React.FC}
        name={ROUTES.UpdatesNotificationsScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MessagesDetailsScreen as React.FC}
        name={ROUTES.MessagesDetailsScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={ArchivedMessagesScreen as React.FC}
        name={ROUTES.ArchivedMessagesScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={ReviceOfferScreen as React.FC}
        name={ROUTES.ReviceOfferScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={DetailsInMessagesScreen as React.FC}
        name={ROUTES.DetailsInMessagesScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={LostConnectionScreen as React.FC}
        name={ROUTES.LostConnectionScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Group screenOptions={{presentation: "modal"}}>
        <NavigationStack.Screen
          component={AccountUpgradesViewDetailsScreen as React.FC}
          name={ROUTES.AccountUpgradesViewDetailsScreen}
          options={animationSlideFromDown}
        />
      </NavigationStack.Group>
      <NavigationStack.Screen
        component={AccountUpgradesHistoryScreen as React.FC}
        name={ROUTES.AccountUpgradesHistoryScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={AccountUpgradesViewMyProfileScreen as React.FC}
        name={ROUTES.AccountUpgradesViewMyProfileScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={AccountUpgradesTermsConditionsScreen as React.FC}
        name={ROUTES.AccountUpgradesTermsConditionsScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyServiceDetailPhotosScreen as React.FC}
        name={ROUTES.MyServiceDetailPhotosScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyServiceDetailDocumentsScreen as React.FC}
        name={ROUTES.MyServiceDetailDocumentsScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={TrustStickersIndividualScreen as React.FC}
        name={ROUTES.TrustStickersIndividualScreen}
        options={animationSlideFromDown}
      />
      <NavigationStack.Screen
        component={MyServiceQualificationCredentialsScreen as React.FC}
        name={ROUTES.MyServiceQualificationCredentialsScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyServiceDocumentsStatusScreen as React.FC}
        name={ROUTES.MyServiceDocumentsStatusScreen}
        options={defaultAnim}
      />
      <NavigationStack.Screen
        component={MyServiceResubmitDocumentsScreen as React.FC}
        name={ROUTES.MyServiceResubmitDocumentsScreen}
        options={defaultAnim}
      />
    </NavigationStack.Navigator>
  )
}

export default Navigator
