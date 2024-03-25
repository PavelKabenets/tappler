import React, { useState } from "react"

// Components
import { ActionBtn, DmAuthInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import MainModal from "components/MainModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { emailRegExp } from "helpers/helpers"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import CloseBigIcon from "assets/icons/cancel-big.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

type Props = RootStackScreenProps<"password-reset">

const PasswordResetScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isErrorModalVisible, setErrorModalVisible] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  })
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleGoBack = () => {
    navigation.goBack()
  }

  const onSubmit = () => {
    handleOpenErrorModal()
  }

  const handleOpenErrorModal = () => {
    setErrorModalVisible(true)
  }

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false)
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white px-[19]">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <DmView
          className="mt-[24]"
          onPress={handleGoBack}
          hitSlop={HIT_SLOP_DEFAULT}
        >
          <CloseIcon />
        </DmView>
        <DmText className="mt-[85] text-16 leading-[25px] font-custom600">
          {t("password_reset")}
        </DmText>
        <DmText className="mt-[10] text-13 font-custom400 leading-[20px]">
          {t("enter_your_registered_email_we_will_send_descr")}
        </DmText>
        <DmView className="mt-[39] px-[24]">
          <Controller
            control={control}
            rules={{
              pattern: { value: emailRegExp, message: t("email_error") },
              required: { value: true, message: t("required_error") },
            }}
            render={({ field: { value, onChange } }) => (
              <DmAuthInput
                value={value}
                placeholder={t("email_address")}
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
            name="email"
          />
          <ActionBtn
            className="mt-[49] mx-[10] h-[44]"
            textClassName="text-13"
            title={t("send_OTP_to_my_email")}
            onPress={() => handleSubmit(onSubmit)()}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <MainModal
        isVisible={isErrorModalVisible}
        onClose={handleCloseErrorModal}
        title={t("email_not_found")}
        descr={t("please_enter_a_valid_descr")}
        titleBtn={t("re_enter_your_email")}
        onPress={handleCloseErrorModal}
        Icon={<CloseBigIcon />}
      />
    </SafeAreaView>
  )
}

export default PasswordResetScreen
