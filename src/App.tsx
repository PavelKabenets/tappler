/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import type { PropsWithChildren } from "react"
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native"
import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from "rn-tourguide"

import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Provider } from "react-redux"
import BootstrapScreen from "screens/BootstrapScreen"
import { store } from "store"
import "locales/i18n"
import "react-native-gesture-handler"
import colors from "styles/colors"
import TooltipComponent from "components/TooltipComponent"
import LoadingModal from "components/LoadingModal"

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar
          barStyle={Platform.OS === "android" ? "dark-content" : "default"}
          backgroundColor="transparent"
          translucent={true}
        />
        <Provider store={store}>
          <TourGuideProvider
            {...{
              tooltipComponent: TooltipComponent,
              borderRadius: 4,
              androidStatusBarVisible: true,
              tooltipStyle: { paddingTop: 0, marginTop: -10 },
            }}
          >
            <BootstrapScreen />
          </TourGuideProvider>
          <LoadingModal />
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App
