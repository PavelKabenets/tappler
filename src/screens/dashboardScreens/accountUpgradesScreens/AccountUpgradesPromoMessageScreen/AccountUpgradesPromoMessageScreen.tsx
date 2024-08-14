import React from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import { ScrollView } from "react-native"
import UserCardComponent from "components/UserCardComponent"

type Props = RootStackScreenProps<"account-upgrades-promo-message">

const AccountUpgradesPromoMessageScreen: React.FC<Props> = ({ navigation }) => {
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
    <SafeAreaView className="flex-1 bg-white px-[10]">
      <DmView className="mt-[18]" onPress={navigation.goBack}>
        <CloseIcon />
      </DmView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <DmText className="mt-[14] text-16 leading-[19px] font-custom600 text-center">
          {t("promo_line_message")}
        </DmText>
        <UserCardComponent className="mt-[10]" isPromoMessage />
        <DmText className="mt-[14] text-12 leading-[20px] font-custom400">
          {t("motivational_stickers_are_marketing_descr")}
        </DmText>
        <DmText className="mt-[14] text-16 leading-[19px] font-custom600">
          {t("promo_line_benefits")}
        </DmText>
        <DmText className="mt-[6] text-12 leading-[20px] font-custom400">
          {t("offering_a_discount_and_other_descr")}
        </DmText>
        <DmText className="mt-[6] text-12 leading-[20px] font-custom400">
          {t("it_will_give_your_profile_a_different_descr")}
        </DmText>
        <DmText className="mt-[6] text-12 leading-[20px] font-custom400">
          {t("hyphen_in_addition_to_the_stickers_descr")}
        </DmText>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountUpgradesPromoMessageScreen
