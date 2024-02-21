import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
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
import UpdateEmailScreen from "screens/onboardingScreens/UpdateEmailScreen"
import RegistrationFlowScreen from "screens/onboardingScreens/RegistrationFlowScreen"

const NavigationStack = createNativeStackNavigator()

const Navigator = ({
  isAuth,
  isRegistrationFlowComleted,
}: {
  isAuth: boolean
  isRegistrationFlowComleted: boolean
}) => (
  <NavigationStack.Navigator
    initialRouteName={
      isAuth
        ? isRegistrationFlowComleted
          ? ROUTES.HomeScreen
          : ROUTES.RegistrationFlowScreen
        : ROUTES.WelcomeScreen
    }
    screenOptions={{
      headerShown: false,
    }}
  >
    <NavigationStack.Screen
      component={HomeScreen as React.FC}
      name={ROUTES.HomeScreen}
    />
    <NavigationStack.Screen
      component={WelcomeScreen as React.FC}
      name={ROUTES.WelcomeScreen}
    />
    <NavigationStack.Screen
      component={FeaturesScreen as React.FC}
      name={ROUTES.FeaturesScreen}
    />
    <NavigationStack.Screen
      component={AuthScreen as React.FC}
      name={ROUTES.AuthScreen}
    />
    <NavigationStack.Screen
      component={SignUpScreen as React.FC}
      name={ROUTES.SignUpScreen}
    />
    <NavigationStack.Screen
      component={LogInScreen as React.FC}
      name={ROUTES.LogInScreen}
    />
    <NavigationStack.Screen
      component={SignInEmailScreen as React.FC}
      name={ROUTES.SignInEmailScreen}
    />
    <NavigationStack.Screen
      component={SignUpEmailScreen as React.FC}
      name={ROUTES.SignUpEmailScreen}
    />
    <NavigationStack.Screen
      component={AllServicesScreen as React.FC}
      name={ROUTES.AllServicesScreen}
    />
    <NavigationStack.Screen
      component={ServiceDetailScreen as React.FC}
      name={ROUTES.ServiceDetailScreen}
    />
    <NavigationStack.Screen
      component={UpdateEmailScreen as React.FC}
      name={ROUTES.UpdateEmailScreen}
    />
    <NavigationStack.Screen
      component={RegistrationFlowScreen as React.FC}
      name={ROUTES.RegistrationFlowScreen}
    />
  </NavigationStack.Navigator>
)

export default Navigator
