import React, { useState } from "react"

// Components
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"

type Props = RootStackScreenProps<"account-upgrades-terms-conditions">

const AccountUpgradesTermsConditionsScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  // State
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t("terms_conditions")}
        onBackComponent={<CloseIcon />}
        className="px-[19] border-b-0"
      />
    </SafeAreaView>
  )
}

export default AccountUpgradesTermsConditionsScreen
