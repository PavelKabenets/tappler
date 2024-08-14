import React, { useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import VerifySuccessModal from "components/VerifySuccessModal"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"

type Props = RootStackScreenProps<"my-account-new-password">

const MyAccountNewPasswordScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      enter_your_new_password: "",
      confirm_new_password: "",
    },
  })
  const newPassword = watch("enter_your_new_password")
  const confirmPassword = watch("confirm_new_password")
  const [showModal, setShowModal] = useState(false)
  const handleButtonPress = () => {
    handleSubmit(() => {
      setShowModal(true)
    })()
  }
  const handleModalClose = () => {
    setShowModal(false)
    navigation.navigate("my-account")
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
  const passwordsMatch = newPassword === confirmPassword
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding className="px-[19] border-b-0" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <DmText className="pt-[54] px-[19] pb-[6] text-20 leading-[16px] font-custom600 text-black">
          {t("new_password")}
        </DmText>
        <DmView className="pl-[19] pr-[40]">
          <Controller
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field: { value, onChange } }) => (
              <DmInput
                className="h-[55] border-x-0 border-t-0"
                inputClassName="text-13 leading-[16px] text-black font-custom400"
                value={value}
                placeholder={t("enter_your_new_password")}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
            name="enter_your_new_password"
          />
        </DmView>
        <DmView className="pl-[19] pr-[40]">
          <Controller
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field: { value, onChange } }) => (
              <DmInput
                className="h-[55] border-x-0 border-t-0"
                inputClassName="text-13 leading-[16px] text-black font-custom400"
                value={value}
                placeholder={t("confirm_new_password")}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
            name="confirm_new_password"
          />
        </DmView>
        <DmText className="text-12 leading-[15px] pt-[21] pb-[32] px-[19] font-custom400 text-red">
          {t("password_must_be_at_least_6_characters")}
        </DmText>
        <DmView className="px-[62]">
          <ActionBtn
            disable={!isValid || !passwordsMatch}
            onPress={handleButtonPress}
            textClassName={clsx(
              "text-13 leading-[16px] font-custom500",
              (!isValid || !passwordsMatch) && "text-grey10 font-400"
            )}
            className={clsx("h-[44] rounded-10")}
            title={t("change_password")}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <VerifySuccessModal
        textSuccess={t("password_changed")}
        title={t("your_password_changed_successfully")}
        classNameTitle="mt-[0] mb-[15]"
        isVisible={showModal}
        onClose={handleModalClose}
      />
    </SafeAreaView>
  )
}

export default MyAccountNewPasswordScreen
