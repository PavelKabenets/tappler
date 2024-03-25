import React, { useEffect } from "react"

import { NavigationContainer } from "@react-navigation/native"
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import { ROUTES } from "./routes"
import HomeScreen from "screens/HomeScreen"
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
import { setCurrentScreen } from "store/auth/slice"
import { I18nManager } from "react-native"

const NavigationStack = createNativeStackNavigator()

const animationSlideFromDown: NativeStackNavigationOptions = {
  animation: "slide_from_bottom",
}

const defaultAnim: NativeStackNavigationOptions = {
  animation: I18nManager.isRTL ? "slide_from_left" : "slide_from_right",
}

const Navigator = ({
  isAuth,
  isRegistrationFlowComleted,
}: {
  isAuth: boolean
  isRegistrationFlowComleted: boolean
}) => {
  const { i18n } = useTranslation()

  const dispatch = useDispatch()
  const { currentScreen } = useTypedSelector((store) => store.auth)
  useEffect(() => {
    setTimeout(() => {
      dispatch(setCurrentScreen(undefined))
    }, 100)
  }, [])
  return (
    <NavigationStack.Navigator
      initialRouteName={
        isAuth
          ? isRegistrationFlowComleted
            ? ROUTES.HomeScreen
            : ROUTES.RegistrationFlowScreen
          : currentScreen || ROUTES.WelcomeScreen
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      <NavigationStack.Screen
        component={HomeScreen as React.FC}
        name={ROUTES.HomeScreen}
        options={defaultAnim}
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
        options={defaultAnim}
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
    </NavigationStack.Navigator>
  )
}

export default Navigator
