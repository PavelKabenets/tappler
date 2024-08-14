import React, { useEffect, useState } from "react"
// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
// Hooks & Redux
import { useTranslation } from "react-i18next"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
// Libs & Utils
import moment from "moment"
// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import { platformColor } from "nativewind"
import { Platform } from "react-native"

type Props = RootStackScreenProps<"account-upgrades-view-details">

const AccountUpgradesViewDetailsScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  // Props
  // State
  const subscription = route.params?.subscription
  const [totalCost, setTotalCost] = useState(0)
  const [discounts, setDiscounts] = useState(0)
  const [resultCost, setResultCost] = useState(0)
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  // Refs
  // Methods
  // Handlers
  // Hooks
  useEffect(() => {
    if (subscription.product_description) {
      setTotalCost(
        subscription.product_description.reduce((sum, item) => {
          return sum + parseFloat(item.cost)
        }, 0)
      )
    }
  }, [subscription])

  useEffect(() => {
    setDiscounts(totalCost / 10)
    setResultCost(totalCost - discounts)
  }, [totalCost])

  useEffect(() => {
    setResultCost(totalCost - discounts)
  }, [totalCost, discounts])
  // Listeners
  // Render Methods
  const formatDate = (dateString: string, currentLanguage: string) => {
    if (currentLanguage === "ar") {
      return moment(dateString).format("YYYY/MM/DD hh:mm A")
    } else {
      return moment(dateString).format("DD/MM/YYYY hh:mm A")
    }
  }
  return (
    <SafeAreaView
      edges={Platform.OS === "ios" ? ["bottom"] : undefined}
      className="flex-1 bg-white px-[15]"
    >
      <HeaderOnboarding
        onBackComponent={<CloseIcon />}
        className="border-b-0"
      />
      <DmView className="flex-row justify-between w-full">
        <DmView className="w-1/3 mr-[15]">
          <DmText className="text-13 leading-[16px] font-custom600">
            {t("order_number")}:
          </DmText>
        </DmView>
        <DmView className="w-2/3">
          <DmText className="text-13 leading-[16px] font-custom400">
            {subscription.order_number}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="flex-row justify-between w-full mt-[11]">
        <DmView className="w-1/3 mr-[15]">
          <DmText className="text-13 leading-[16px] font-custom600">
            {t("date_and_time")}:
          </DmText>
        </DmView>
        <DmView className="w-2/3">
          <DmText className="text-13 leading-[16px] font-custom400">
            {formatDate(subscription.created_at, i18n.language)}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="flex-row justify-between w-full mt-[11]">
        <DmView className="w-1/3 mr-[15]">
          <DmText className="text-13 leading-[16px] font-custom600">
            {t("service_type")}:
          </DmText>
        </DmView>
        <DmView className="w-2/3">
          <DmText className="text-13 leading-[16px] font-custom400">
            {subscription.service_type}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="flex-row justify-between w-full mt-[11]">
        <DmView className="w-1/3 mr-[15]">
          <DmText className="text-13 leading-[16px] font-custom600">
            {t("category")}:
          </DmText>
        </DmView>
        <DmView className="w-2/3">
          <DmText className="text-13 leading-[16px] font-custom400">
            {subscription.category}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="flex-row justify-between w-full mt-[11]">
        <DmView className="w-1/3 mr-[15]">
          <DmText className="text-13 leading-[16px] font-custom600">
            {t("amount")}:
          </DmText>
        </DmView>
        <DmView className="w-2/3">
          <DmText className="text-13 leading-[16px] font-custom400">
            {resultCost} {t("EGP")}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="flex-row justify-between w-full mt-[11]">
        <DmView className="w-1/3 mr-[15]">
          <DmText className="text-13 leading-[16px] font-custom600">
            {t("payment_method")}:
          </DmText>
        </DmView>
        <DmView className="w-2/3">
          <DmText className="text-13 leading-[16px] font-custom400">
            {subscription.payment_method}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="flex-row justify-between w-full mt-[11]">
        <DmView className="w-1/3 mr-[15]">
          <DmText className="text-13 leading-[16px] font-custom600">
            {t("payment_ref")}:
          </DmText>
        </DmView>
        <DmView className="w-2/3">
          <DmText className="text-13 leading-[16px] font-custom400">
            {subscription.payment_ref}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="w-full mt-[11]">
        <DmText className="text-13 leading-[16px] font-custom600">
          {t("subscription_details")}:
        </DmText>
      </DmView>
      <DmView className="mt-[11] border-0.2 border-black rounded-1">
        <DmView className="">
          <DmView className="flex-row">
            <DmView className="w-1/2 items-center border-r-0.2 py-[8]">
              <DmText className="text-11 leading-[14px] font-custom600">
                {t("product_description")}
              </DmText>
            </DmView>
            <DmView className="w-1/4 items-center border-r-0.2 py-[8]">
              <DmText className="text-11 leading-[14px] font-custom600">
                {t("days")}
              </DmText>
            </DmView>
            <DmView className="w-1/4 items-center py-[8]">
              <DmText className="text-11 leading-[14px] font-custom600">
                {t("cost")}
              </DmText>
            </DmView>
          </DmView>
          {subscription.product_description?.map((item, index) => (
            <DmView className="flex-row border-t-0.2" key={index}>
              <DmView className="w-1/2 px-[10] border-r-0.2 py-[7]">
                <DmText className="text-11 leading-[14px] font-custom400">
                  {t(item.name)}
                </DmText>
              </DmView>
              <DmView className="w-1/4 items-center border-r-0.2 py-[7]">
                <DmText className="text-11 leading-[14px] font-custom400">
                  {item.days}
                </DmText>
              </DmView>
              <DmView className="w-1/4 items-end px-[7] py-[7]">
                <DmText className="text-11 leading-[14px] font-custom400">
                  {item.cost} {t("EGP")}
                </DmText>
              </DmView>
            </DmView>
          ))}
          <DmView className="flex-row border-t-0.2">
            <DmView className="w-3/4 items-end px-[10] border-r-0.2 py-[7]">
              <DmText className="text-11 leading-[14px] font-custom400">
                {t("total_services_cost")}:
              </DmText>
            </DmView>
            <DmView className="w-1/4 items-end px-[7] border-l-0 py-[7]">
              <DmText className="text-11 leading-[14px] font-custom400">
                {totalCost} {t("EGP")}
              </DmText>
            </DmView>
          </DmView>
          <DmView className="flex-row border-t-0.2">
            <DmView className="w-3/4 items-end px-[10] border-r-0.2 py-[7]">
              <DmText className="text-11 leading-[14px] font-custom400 text-red">
                {t("discounts")}:
              </DmText>
            </DmView>
            <DmView className="w-1/4 items-end px-[7] border-l-0 py-[7]">
              <DmText className="text-11 leading-[14px] font-custom400 text-red">
                {discounts} {t("EGP")}
              </DmText>
            </DmView>
          </DmView>
          <DmView className="flex-row border-t-0.2">
            <DmView className="w-3/4 items-end px-[10] border-r-0.2 py-[7]">
              <DmText className="text-11 leading-[14px] font-custom400">
                {t("vat_amount")}:
              </DmText>
            </DmView>
            <DmView className="w-1/4 items-end px-[7] border-l-0 py-[7]">
              <DmText className="text-11 leading-[14px] font-custom400">
                {subscription.vat_amount} {t("EGP")}
              </DmText>
            </DmView>
          </DmView>
          <DmView className="flex-row border-t-0.2">
            <DmView className="w-3/4 items-end px-[10] border-r-0.2 py-[8]">
              <DmText className="text-11 leading-[14px] font-custom600">
                {t("total_inclusive_of_vat")}:
              </DmText>
            </DmView>
            <DmView className="w-1/4 items-end px-[7] border-l-0 py-[8]">
              <DmText className="text-11 leading-[14px] font-custom600">
                {resultCost} {t("EGP")}
              </DmText>
            </DmView>
          </DmView>
        </DmView>
      </DmView>
      <DmView className="flex-row w-full mt-[12]">
        <DmView>
          <DmText className="text-13 leading-[16px] font-custom600">
            {t("sales_person")}:
          </DmText>
        </DmView>
        <DmView className="mx-[10]">
          <DmText className="text-13 leading-[16px] font-custom400">
            {subscription.sales_person}
          </DmText>
        </DmView>
      </DmView>
    </SafeAreaView>
  )
}

export default AccountUpgradesViewDetailsScreen
