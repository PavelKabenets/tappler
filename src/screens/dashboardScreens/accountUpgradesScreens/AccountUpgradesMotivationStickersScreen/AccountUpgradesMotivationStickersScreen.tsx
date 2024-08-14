import React from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
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

type Props = RootStackScreenProps<"account-upgrades-motivation-stickers">

const AccountUpgradesMotivationStickersScreen: React.FC<Props> = ({
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
  const handleViewStickersPress = () => {
    navigation.navigate("account-upgrades-motivation-stickers-detail")
  }
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
          {t("motivational_stickers")}
        </DmText>
        <UserCardComponent className="mt-[10]" isStickers />
        <DmText className="mt-[14] text-12 leading-[20px] font-custom400">
          {t("motivational_stickers_are_marketing_descr")}
        </DmText>
        <DmText className="mt-[14] text-16 leading-[19px] font-custom600">
          {t("motivational_stickers_benefits")}
        </DmText>
        <DmText className="mt-[6] text-12 leading-[20px] font-custom400">
          {t("discounts_and_other_benefits_descr")}
        </DmText>
        <DmText className="mt-[14] text-12 leading-[20px] font-custom400">
          {t("in_addition_to_the_stickers_descr")}
        </DmText>
        <DmText className="mt-[6] text-12 leading-[20px] font-custom400">
          {t("it_will_give_your_descr")}
        </DmText>
        <DmView className="mt-[24] items-center">
          <ActionBtn
            title={t("view_stickers")}
            textClassName="uppercase text-11 leading-[14px] font-custom600"
            className="w-[155] h-[35] rounded-8"
            onPress={handleViewStickersPress}
          />
        </DmView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountUpgradesMotivationStickersScreen
