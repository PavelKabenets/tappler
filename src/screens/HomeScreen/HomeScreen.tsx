import React from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"

// Hooks & Redux
import { useDispatch } from "react-redux"
import { logout } from "store/auth/slice"

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
  const dispatch = useDispatch()
  // Refs
  // Methods
  // Handlers
  const handleLogOut = () => {
    dispatch(logout())
    navigation.replace("welcome")
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 justify-center px-[24]">
      <ActionBtn title="Restart demo" onPress={handleLogOut} />
    </SafeAreaView>
  )
}

export default HomeScreen
