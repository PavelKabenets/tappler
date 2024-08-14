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
import DiscountRedIcon from "assets/icons/discount-red.svg"
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
    switch (type) {
      case "featured":
        return navigation.navigate("account-upgrades-featured-pro")
      case "motivational":
        return navigation.navigate("account-upgrades-motivation-stickers")
      case "promo":
        return navigation.navigate("account-upgrades-promo-message")
    }
  }

  const handleSubmit = () => {
    navigation.navigate("account-upgrades-contact-details")
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
          className="mt-[14] px-[14]"
          onPress={navigation.goBack}
          hitSlop={HIT_SLOP_DEFAULT}
        >
          <CloseIcon />
        </DmView>
        <TitleRegistrationFlow
          title={t("upgrade_options")}
          classNameTitle="text-18 leading-[22px]"
          descr={t("tap_on_learn_more_to_view_the_details", {text: '"Learn more"'})}
          classNameDescr="text-13 leading-[20px]"
          className="mt-[32] px-[20]"
        />
        <AccountUpdateOptionsItem
          className="mt-[13]"
          title={t("featured_pro")}
          descr={t("promote_your_account")}
          onPress={() => handleItemPress("featured")}
          onLearnMorePress={() => handleItemLearnMorePress("featured")}
          isFeatured
        />
        <AccountUpdateOptionsItem
          title={t("motivational_stickers")}
          descr={t("powerful_stickers_to_promote_your_business")}
          onPress={() => handleItemPress("motivational")}
          onLearnMorePress={() => handleItemLearnMorePress("motivational")}
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
                {t("number_hour_service")}
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
          descr={t("add_customized_message_under_your_profile")}
          onPress={() => handleItemPress("promo")}
          onLearnMorePress={() => handleItemLearnMorePress("promo")}
          isBorderVisible={false}
        >
          <DmView className="flex-1 items-center">
            <DmView className="flex-row items-center">
              <DiscountRedIcon />
              <DmText className="mx-[7] text-10 leading-[13px] font-custom700">
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
          className="mt-[20] px-[20]"
          classNameDescrArrItem="text-13 leading-[16px] ml-[10]"
          classNameDescrArrItemWrapper="mt-[10]"
        />
      </DmView>
    </SafeAreaView>
  )
}

export default AccountUpgradesSelectOptionsScreen
