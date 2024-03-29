import React from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"

type Props = RootStackScreenProps<"auth">

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleGoSignUpScreen = () => {
    navigation.navigate("sign-up")
  }
  const handleGoLogInScreen = () => {
    navigation.navigate("log-in")
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 pt-[99] pb-[32] px-[24] justify-between bg-white">
      <DmView>
        <DmView className="items-center">
          {/* @TO DO */}
          <DmView style={styles.emptyImg} />
        </DmView>
        <DmText className="mt-[8] px-[4] text-center">
          {t("create_an_account_to_join_descr")}
        </DmText>
      </DmView>
      <DmView>
        <ActionBtn
          title={t("create_free_account")}
          onPress={handleGoSignUpScreen}
          className="rounded-5"
          textClassName="uppercase text-15 font-custom500"
        />
        <ActionBtn
          title={t("login")}
          onPress={handleGoLogInScreen}
          className="mt-[12] rounded-5"
          textClassName="uppercase text-13 font-custom400"
          variant="white"
        />
      </DmView>
    </SafeAreaView>
  )
}

export default AuthScreen
