import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import AccountUpdateOptionsItem from "components/AccountUpdateOptionsItem"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import { benefitsData } from "data/accountUpgradeData"

type Props = RootStackScreenProps<"account-upgrades-select-options">

const AccountUpgradesSelectOptionsScreen: React.FC<Props> = ({
  navigation,
}) => {
  // Props
  // State
  const [selectedTypes, setSelectedTypes] = useState<
    ("featured" | "motivational" | "promo")[]
  >([])
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleItemPress = (type: "featured" | "motivational" | "promo") => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes((prev) => prev.filter((item) => item !== type))
    } else {
      setSelectedTypes((prev) => [...prev, type])
    }
  }

  const handleItemLearnMorePress = (
    type: "featured" | "motivational" | "promo"
  ) => {
    //
  }

  const handleSubmit = () => {
    //
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      className="flex-1 bg-white justify-between"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView>
        <DmView
          className="mt-[14] px-[24]"
          onPress={navigation.goBack}
          hitSlop={HIT_SLOP_DEFAULT}
        >
          <CloseIcon />
        </DmView>
        <TitleRegistrationFlow
          title={t("select_upgrade_options")}
          classNameTitle="text-18 leading-[22px]"
          descr={t("select_one_or_more_from_the_upgrade_options")}
          classNameDescr="text-13 leading-[20px]"
          className="mt-[32] px-[14]"
        />
        <AccountUpdateOptionsItem
          className="mt-[27]"
          title={t("featured_pro")}
          descr={t("promote_your_account")}
          onPress={() => handleItemPress("featured")}
          onLearnMorePress={() => handleItemLearnMorePress("featured")}
          isFeatured
          isChecked={selectedTypes.includes("featured")}
        />
        <AccountUpdateOptionsItem
          title={t("motivational_stickers")}
          descr={t("powerful_stickers_to_promote_your_business")}
          onPress={() => handleItemPress("motivational")}
          onLearnMorePress={() => handleItemLearnMorePress("motivational")}
          isChecked={selectedTypes.includes("motivational")}
        >
          <DmView className="flex-1 flex-row items-center justify-between">
            <DmView className="flex-row items-center">
              <DmText className="text-8 leading-[13px] font-custom700">
                {t("instant_discounts")}
              </DmText>
              <DmView className="ml-[3] w-[23] h-[21] bg-grey" />
            </DmView>
            <DmView className="flex-row items-center">
              <DmText className="text-8 leading-[13px] font-custom700">
                {t("number_hour_service", { number: 24 })}
              </DmText>
              <DmView className="ml-[3] w-[23] h-[21] bg-grey" />
            </DmView>
            <DmView className="flex-row items-center">
              <DmText className="text-8 leading-[13px] font-custom700">
                {t("fast_delivery")}
              </DmText>
              <DmView className="ml-[3] w-[23] h-[21] bg-grey" />
            </DmView>
          </DmView>
        </AccountUpdateOptionsItem>
        <AccountUpdateOptionsItem
          title={t("customized_promo_message")}
          descr={t("Add customized message under your profile")}
          onPress={() => handleItemPress("promo")}
          onLearnMorePress={() => handleItemLearnMorePress("promo")}
          isBorderVisible={false}
          isChecked={selectedTypes.includes("promo")}
        >
          <DmView className="flex-1 items-center">
            <DmView className="flex-row items-center">
              <DmView className="mr-[7] w-[18] h-[16] bg-grey" />
              <DmText className="text-10 leading-[13px] font-custom700">
                {t("example_number_off_your_service_on_tuesdays", {
                  number: 20,
                })}
              </DmText>
            </DmView>
          </DmView>
        </AccountUpdateOptionsItem>
        <TitleRegistrationFlow
          classNameDescrArr="mt-[6]"
          title={t("upgrade_benefits")}
          descrArray={benefitsData}
          className="mt-[20] px-[19]"
          classNameDescrArrItem="text-13 leading-[16px] ml-[10]"
          classNameDescrArrItemWrapper="mt-[10]"
        />
      </DmView>
      <ActionBtn
        className="mx-[20] rounded-5 h-[47]"
        title={t("continue")}
        textClassName="text-13 leading-[16px] font-custom600"
        onPress={handleSubmit}
        disable={!selectedTypes.length}
      />
    </SafeAreaView>
  )
}

export default AccountUpgradesSelectOptionsScreen
