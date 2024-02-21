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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Provider } from "react-redux"
import BootstrapScreen from "screens/BootstrapScreen"
import { store } from "store"
import "locales/i18n"

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar barStyle="default" />
        <Provider store={store}>
          <BootstrapScreen />
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App
