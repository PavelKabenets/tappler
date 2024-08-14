import React from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Controller, useForm } from "react-hook-form"
import { useTypedSelector } from "store"

type Props = RootStackScreenProps<"account-upgrades-contact-details">

const AccountUpgradesContactDetailsScreen: React.FC<Props> = ({
  navigation,
}) => {
  // Props
  // State
  const { user } = useTypedSelector((store) => store.auth)

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      businessName: user?.businessName || "",
      name: user?.registeredName || "",
      phone: user?.mobileNumber || "",
      descr: "",
    },
  })
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  const onSubmit = () => {
    navigation.navigate("done", {
      nextScreenName: "account-upgrades",
      nextScreenParams: undefined,
    })
  }
  // Handlers
  // Hooks
  // Listeners
  // Render Methods
  return (
    <SafeAreaView
      className="flex-1 bg-white px-[12]"
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
    >
      <DmView className="px-[12]" onPress={navigation.goBack}>
        <CloseIcon />
      </DmView>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <DmView>
          <DmText className="mt-[32] text-18 leading-[18px] font-custom600">
            {t("your_contact_details")}
          </DmText>
          <Controller
            control={control}
            rules={{ required: { value: true, message: t("required_error") } }}
            render={({ field: { value, onChange } }) => (
              <DmInput
                value={value}
                onChangeText={(val) => {
                  onChange(val)
                  trigger("businessName")
                }}
                placeholder={t("business_name")}
                className="mt-[16]"
                error={errors.businessName?.message}
              />
            )}
            name="businessName"
          />
          <Controller
            control={control}
            rules={{ required: { value: true, message: t("required_error") } }}
            render={({ field: { value, onChange } }) => (
              <DmInput
                value={value}
                onChangeText={(val) => {
                  onChange(val)
                  trigger("name")
                }}
                placeholder={t("your_name")}
                className="mt-[8]"
                error={errors.name?.message}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            rules={{
              required: { value: true, message: t("required_error") },
              minLength: {
                value: watch("phone")?.includes("+20") ? 14 : 11,
                message: t("min_lenth_11_error", {
                  number: watch("phone")?.includes("+20") ? 13 : 11,
                }),
              },
            }}
            render={({ field: { value, onChange } }) => (
              <DmInput
                value={value}
                onChangeText={(val) => {
                  onChange(val)
                  trigger("phone")
                }}
                placeholder={t("your_contact_number")}
                className="mt-[8]"
                maxLength={value?.includes("+20") ? 14 : 11}
                error={errors?.phone?.message}
              />
            )}
            name="phone"
          />
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <DmInput
                value={value}
                onChangeText={onChange}
                placeholder={`${t("additional_info_or_requests")}: (${t("optional")})`}
                className="mt-[8]"
                multiline
              />
            )}
            name="descr"
          />
          <DmText className="mt-[20] text-18 leading-[22px] font-custom600">
            {t("what_is_next")}
          </DmText>
          <DmText className="mt-[5] text-13 leading-[20px] font-custom400">
            {t("enter_your_notes_or_special_descr2")}
          </DmText>
        </DmView>
        <ActionBtn
          title={t("send")}
          className="rounded-5"
          textClassName="text-13 leading-[16px] font-custom600"
          onPress={handleSubmit(onSubmit)}
          disable={!isValid}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default AccountUpgradesContactDetailsScreen
