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
import { setCurrentScreen, setLoadingModalVisible, setLogout } from "store/auth/slice"
import { I18nManager } from "react-native"
import LeadsScreen from "screens/dashboardScreens/LeadsScreen"
import OpportunitiesScreen from "screens/dashboardScreens/opportunitiesScreens/OpportunitiesScreen"
import MessagesScreen from "screens/dashboardScreens/MessagesScreen"
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

  const dispatch = useDispatch()
  const { currentScreen, isLogout } = useTypedSelector((store) => store.auth)
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
      setTimeout(() => {
        dispatch(setLoadingModalVisible(false))
      }, 1800)
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "auth" }],
        })
      }, 2000)
    }
  }, [isLogout])

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
        options={defaultAnim}
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
    </NavigationStack.Navigator>
  )
}

export default Navigator
