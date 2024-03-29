import React from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"

// Hooks & Redux

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"

type Props = RootStackScreenProps<"home">

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  // Global Store
  // Variables
  // Refs
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView>
      <DmText>HomeScreen</DmText>
    </SafeAreaView>
  )
}

export default HomeScreen
