import React, { useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "navigation/types"

import styles from "./styles"
import SubscriptionEmptyIcon from "assets/icons/subscription-empty.svg"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import clsx from "clsx"
import ShieldIcon from "assets/icons/shield-close.svg"
import MainModal from "components/MainModal"
import { useTypedSelector } from "store"

interface Props {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "account-upgrades",
    undefined
  >
}

const SubscriptionView: React.FC<Props> = ({ navigation }) => {
  const [isActiveModalVisible, setActiveModalVisible] = useState(false)

  const { user } = useTypedSelector((store) => store.auth)

  const handleOpenAccountActiveModal = () => {
    setActiveModalVisible(true)
  }

  const handleCloseAccountActiveModal = () => {
    setActiveModalVisible(false)
  }

  const handleStartPress = () => {
    handleOpenAccountActiveModal()
  }

  const handleGoAccountUpgradesSelectOptionsScreen = () => {
    handleCloseAccountActiveModal()
    setTimeout(() => {
      navigation.navigate("account-upgrades-select-options")
    }, 400)
  }

  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  return (
    <>
      <DmView className="flex-1 px-[11]">
        <DmView
          className={clsx("mt-[36] justify-between flex-1")}
          style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
        >
          <DmView>
            <DmView className="items-center">
              <SubscriptionEmptyIcon />
            </DmView>
            <DmView className="pl-[10] pr-[5]">
              <DmText className="mt-[53] text-22 leading-[27px] font-custom600">
                {t("why_should_you_upgrade")}
              </DmText>
              <DmText className="mt-[9] text-13 leading-[23px] font-custom500">
                {t("bring_your_profile_on_top_of_your_descr")}
              </DmText>
              <DmText className="text-13 leading-[23px] font-custom500">
                {t("tap_on_start_and_let_descr")}
              </DmText>
            </DmView>
          </DmView>
          <ActionBtn
            className="mx-[28] mt-[14] h-[47] rounded-20"
            title={t("start")}
            textClassName="text-13 leading-[16px] font-custom600"
            onPress={handleStartPress}
          />
        </DmView>
      </DmView>
      <MainModal
        isVisible={isActiveModalVisible}
        onClose={handleCloseAccountActiveModal}
        className="py-[30] px-[18]"
        title={t("account_not_active")}
        descr={t("before_adding_trust_stickers_you_must_activate_descr")}
        classNameTitle="mt-[17] text-16 leading-[19px]"
        classNameDescr="text-13 leading-[20px] font-custom400"
        Icon={<ShieldIcon />}
        titleBtn={t("activate")}
        classNameBtn="mt-[18.5] h-[47] rounded-21"
        classNameActionBtnText="text-13 leading-[16px] font-custom600"
        onPress={handleGoAccountUpgradesSelectOptionsScreen}
      />
    </>
  )
}

export default SubscriptionView
