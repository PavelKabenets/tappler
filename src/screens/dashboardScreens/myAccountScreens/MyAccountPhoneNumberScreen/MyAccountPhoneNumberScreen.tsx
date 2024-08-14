import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import PhoneInput from "components/PhoneInput"
import VerifySuccessModal from "components/VerifySuccessModal"

// Hooks & Redux
import { useSSR, useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useTypedSelector } from "store"
// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import PhoneIcon from "assets/icons/phone.svg"

type Props = RootStackScreenProps<"my-account-phone-number">

const MyAccountPhoneNumberScreen: React.FC<Props> = ({ route, navigation }) => {
  const { user } = useTypedSelector((store) => store.auth)
  const isSuccessModalVisible = route.params?.isSuccessModalVisible
  // Props
  // State
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      phone_number: "",
    },
  })

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const onSubmit = () => {
    navigation.navigate("my-account-verify-mobile-number", {
      phone: getValues("phone_number"),
    })
  }
  const handleButtonPress = () => {
    handleSubmit(onSubmit, () => setShowErrorMessage(true))()
  }
  const handleModalClose = () => {
    navigation.navigate("my-account", { isSuccessModalVisible: false })
  }
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
        onBackComponent={<CloseIcon />}
        className="px-[16] pb-[2] border-b-0"
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <DmView className="flex-row items-center px-[31]">
          <PhoneIcon width={16} height={16} />
          <DmText className="px-[2] text-13 leading-[22px] font-custom600">
            {t("your_current_mobile_number")}
            {": "}
            <DmText className="text-13 leading-[22px] font-custom400">
              {user?.mobileNumber}
            </DmText>
          </DmText>
        </DmView>
        <DmView className="pt-[60] px-[31]">
          <DmText className="text-20 leading-[24px] font-custom600 text-black pb-[10]">
            {t("update_mobile_number")}
          </DmText>
          <DmText className="text-11 leading-[22px] font-custom400 text-black">
            {t("we_will_send_you_a_verification_code")}
          </DmText>
        </DmView>
        <DmView className="px-[35] pt-[55]">
          <DmText className=" text-11 leading-[22px] font-custom500 text-red">
            {t("enter_your_new_mobile_number")}
          </DmText>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <PhoneInput
                value={value}
                maxLength={11}
                placeholder={t("01XXXXXXXXXX")}
                onChangeText={onChange}
              />
            )}
            name="phone_number"
          />
        </DmView>
        <DmView className="px-[35] pt-[20]">
          <ActionBtn
            disable={!isValid || watch("phone_number").length < 11}
            onPress={handleButtonPress}
            textClassName={clsx(
              "text-13 leading-[16px] font-custom500",
              (!isValid || watch("phone_number").length < 11) && "text-grey10"
            )}
            className={clsx("h-[47] rounded-10")}
            title={t("send_verification_code")}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <VerifySuccessModal
        title={t("your_mobile_number_has_been_updated")}
        isVisible={!!isSuccessModalVisible}
        onClose={handleModalClose}
      />
    </SafeAreaView>
  )
}

export default MyAccountPhoneNumberScreen
