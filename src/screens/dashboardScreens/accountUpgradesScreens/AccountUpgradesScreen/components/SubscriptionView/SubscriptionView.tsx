import React, { useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import SubscriptionElemComponent from "components/SubscriptionElemComponent"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import MainModal from "components/MainModal"

import { useTranslation } from "react-i18next"

import { useTypedSelector } from "store"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { RootStackParamList } from "navigation/types"
import { mockSubscriptionDetailsData } from "data/mockData"
import moment from "moment"

import clsx from "clsx"
import styles from "./styles"
import SubscriptionEmptyIcon from "assets/icons/subscription-empty.svg"
import ShieldIcon from "assets/icons/shield-close.svg"

interface Props {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "account-upgrades",
    undefined
  >
}

const SubscriptionView: React.FC<Props> = ({ navigation }) => {
  const [isActiveModalVisible, setActiveModalVisible] = useState(false)
  const [isBasic, setIsBasic] = useState(true)
  const subscription = mockSubscriptionDetailsData[0]
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
  const handleGoAccountUpgradesViewDetailsScreen = () => {
    navigation.navigate("account-upgrades-view-details", {
      subscription: mockSubscriptionDetailsData[0],
    })
  }

  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  const formatDate = (dateString: string, currentLanguage: string) => {
    if (currentLanguage === "ar") {
      return moment(dateString).format("YYYY/MM/DD hh:mm A")
    } else {
      return moment(dateString).format("DD/MM/YYYY hh:mm A")
    }
  }
  return (
    <>
      {isBasic ? (
        <DmView className="flex-1 px-[11]">
          <DmView
            className={clsx("mt-[36] justify-between flex-1")}
            style={{
              paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom,
            }}
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
      ) : (
        <DmView className="flex-1 px-[14]">
          <DmView className="mt-[25]">
            <DmText className="text-16 leading-[19px] font-custom600">
              {t("current_subscriptions")}
            </DmText>
            <DmText className="mt-[6] mb-[10] text-11 leading-[14px] font-custom400">
              {t("you_are_subscribed_to_the_following_services")}
            </DmText>
          </DmView>
          <SubscriptionElemComponent
            title={"Featured Pro خدمة المميز"}
            ends_time={t("ends_on")}
            time={formatDate(subscription.created_at, i18n.language)}
            order={t("order")}
            order_number={subscription.order_number}
            onPress={handleGoAccountUpgradesViewDetailsScreen}
          />
          <SubscriptionElemComponent
            title={"خصومات فورية"}
            ends_time={t("ends_on")}
            time={formatDate(subscription.created_at, i18n.language)}
            order={t("order")}
            order_number={subscription.order_number}
            Icon={<DmView className="w-[26] h-[26] bg-grey" />}
            isModal
            onPress={handleGoAccountUpgradesViewDetailsScreen}
          />
          <SubscriptionElemComponent
            className="border-t-0"
            title={"خدمة ٢٤ ساعة"}
            ends_time={t("ends_on")}
            time={formatDate(subscription.created_at, i18n.language)}
            order={t("order")}
            order_number={subscription.order_number}
            Icon={<DmView className="w-[26] h-[26] bg-grey" />}
            isModal
            onPress={handleGoAccountUpgradesViewDetailsScreen}
          />
          <SubscriptionElemComponent
            title={"توصيل سريع"}
            ends_time={t("ends_on")}
            time={formatDate(subscription.created_at, i18n.language)}
            order={t("order")}
            order_number={subscription.order_number}
            Icon={<DmView className="w-[26] h-[26] bg-grey" />}
            isModal
            onPress={handleGoAccountUpgradesViewDetailsScreen}
          />
        </DmView>
      )}
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
