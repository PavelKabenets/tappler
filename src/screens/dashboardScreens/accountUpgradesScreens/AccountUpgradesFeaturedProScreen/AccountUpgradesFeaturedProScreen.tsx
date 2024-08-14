import React from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import UserCardComponent from "components/UserCardComponent"
import { ScrollView } from "react-native"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"

type Props = RootStackScreenProps<"account-upgrades-featured-pro">

const AccountUpgradesFeaturedProScreen: React.FC<Props> = ({ navigation }) => {
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
    <SafeAreaView className="flex-1 bg-white px-[14]">
      <DmView className="mt-[18]" onPress={navigation.goBack}>
        <CloseIcon />
      </DmView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <DmText className="mt-[10] text-16 leading-[19px] font-custom600 text-center">
          {t("featured_pro")}
        </DmText>
        <UserCardComponent className="mt-[14]" isDistinct />
        <DmText className="mt-[14] text-12 leading-[20px] font-custom400">
          {t("featured_pro_is_a_premium_descr")}
        </DmText>
        <DmText className="mt-[24] text-16 leading-[19px] font-custom600">
          {t("why_should_i_become_a_featured_pro")}
        </DmText>
        <DmText className="mt-[14] text-12 leading-[20px] font-custom400">
          {t("consumer_behavior_studies_descr")}
        </DmText>
        <DmText className="mt-[24] text-12 leading-[20px] font-custom400">
          {t("your_profile_will_appear_descr")}
        </DmText>
        <DmText className="mt-[24] text-12 leading-[20px] font-custom400">
          {t("it_is_an_effective_marketing_descr")}
        </DmText>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountUpgradesFeaturedProScreen
