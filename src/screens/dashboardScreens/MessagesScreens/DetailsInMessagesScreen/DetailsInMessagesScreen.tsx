import React, { useState } from "react"

// Components
import { DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
// Helpers & Types
import { useTypedSelector } from "store"
import { RootStackScreenProps } from "navigation/types"
// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"

type Props = RootStackScreenProps<"details-in-messages">

const DetailsInMessagesScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  // State
  const { user } = useTypedSelector((store) => store.auth)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      currency: "",
    },
  })
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
        className="px-[24] border-b-0"
        onBackComponent={<CloseIcon />}
        title={t("stand_in_line")}
      />
      <DmView className="h-[121] bg-grey" />
      <DmView className="h-[35] bg-pink1 items-center justify-center">
        <DmText className="text-13 leading-[16px] font-custom600">
          {t("job_details")}
        </DmText>
      </DmView>
      <DmView className="pt-[16] pl-[15] pr-[48]">
        <DmView className="flex-row">
          <DmText className="mr-[5] text-13 leading-[16px] font-custom600">
            {t("request_n")}:{""}
          </DmText>
          <DmText className="text-13 leading-[16px] font-custom400">
            {"124151"}
          </DmText>
        </DmView>
        <DmView className="flex-row pt-[10]">
          <DmText className="mr-[5] text-13 leading-[16px] font-custom600">
            {t("customer_name")}:{""}
          </DmText>
          <DmText className="text-13 leading-[16px] font-custom400">
            {"Alice Baker"}
          </DmText>
        </DmView>
        <DmView className="flex-row pt-[10]">
          <DmText className="mr-[5] text-13 leading-[16px] font-custom600">
            {t("posted_on")}:{""}
          </DmText>
          <DmText className="text-13 leading-[16px] font-custom400">
            {"21 February 2021 at 5:26PM"}
          </DmText>
        </DmView>
        <DmView className="flex-row pt-[10]">
          <DmText className="mr-[5] text-13 leading-[16px] font-custom600">
            {t("area")}:{""}
          </DmText>
          <DmText className="text-13 leading-[16px] font-custom400">
            {"Downtown Cairo"}
          </DmText>
        </DmView>
        <DmView className="pt-[10]">
          <DmText className="mr-[5] text-13 leading-[16px] font-custom600">
            {t("service_place")}:{""}
          </DmText>
          <DmText className="mt-[5] text-13 leading-[16px] font-custom400">
            {"وزارة الإسكان والتعمير - شارع طلعت حرب - القاهرة"}
          </DmText>
        </DmView>
        <DmView className="pt-[10]">
          <DmText className="mr-[5] text-13 leading-[16px] font-custom600">
            {t("service_date")}:{""}
          </DmText>
          <DmText className="mt-[5] text-13 leading-[16px] font-custom400">
            {"Tuesday 26 February 2021"}
          </DmText>
        </DmView>
        <DmView className="pt-[10]">
          <DmText className="mr-[5] text-13 leading-[16px] font-custom600">
            {t("service_time")}:{""}
          </DmText>
          <DmText className="mt-[5] text-13 leading-[16px] font-custom400">
            {"From 10AM to 12PM"}
          </DmText>
        </DmView>
        <DmView className="pt-[10]">
          <DmText className="mr-[5] text-13 leading-[16px] font-custom600">
            {t("expected_time_to_complete_the_service")}:{""}
          </DmText>
          <DmText className="mt-[5] text-13 leading-[16px] font-custom400">
            {"2 to 4 Hours"}
          </DmText>
        </DmView>
        <DmView className="pt-[10]">
          <DmText className="mr-[5] text-13 leading-[16px] font-custom600">
            {t("customer_notes")}:{""}
          </DmText>
          <DmText className="mt-[5] text-13 leading-[16px] font-custom400">
            {
              "قم هنا بتقديم معلومات وافية عن الخدمة المطلوبة حتى يتمكن مقدم الخدمة من معرفة معلومات كافية عن طلبك وتقديم العرض المناسب لك"
            }
          </DmText>
        </DmView>
        <DmView className="pt-[10]">
          <DmText className="mr-[5] text-13 leading-[16px] font-custom600">
            {t("status")}:{""}
          </DmText>
          <DmText className="mt-[5] text-13 leading-[16px] font-custom400">
            {"Cancelled by client on 22/10/2021 11:25PM"}
          </DmText>
        </DmView>
      </DmView>
    </SafeAreaView>
  )
}

export default DetailsInMessagesScreen
