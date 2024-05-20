import React, { useState } from "react"

// Components
import { ActionBtn, DmAuthInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import MainModal from "components/MainModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { useAuthResetPasswordMutation } from "services/api"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { emailRegExp } from "helpers/helpers"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/arrow-back.svg"
import CloseBigIcon from "assets/icons/cancel-big.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import { I18nManager } from "react-native"
import { returnErrorMessageArr } from "utils/returnErrorMessage"
import { ErrorSignUpEmailType } from "types"

type Props = RootStackScreenProps<"password-reset">

const PasswordResetScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isErrorModalVisible, setErrorModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [responseError, setResponseError] = useState("")

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  })
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  const [resetPassword] = useAuthResetPasswordMutation()
  // Refs
  // Methods
  // Handlers
  const handleGoBack = () => {
    navigation.goBack()
  }

  const onSubmit = async () => {
    try {
      setLoading(true)
      await resetPassword({
        email: getValues("email"),
        // @TO DO
        userType: "pro",
        lang: i18n.language,
      }).unwrap()
      navigation.navigate("password-reset-code", { email: getValues("email") })
    } catch (e) {
      console.log("Reset Error: ", e)
      if (
        returnErrorMessageArr(e as ErrorSignUpEmailType)[0] ===
          "Email is not registered!" ||
        "البريد الالكتروني غير مسجل لدينا"
      ) {
        navigation.navigate("password-reset-code", { email: getValues("email") })
        setLoading(false)
        return
      }
      handleOpenErrorModal()
      setResponseError(returnErrorMessageArr(e as ErrorSignUpEmailType)[0])
    } finally {
      setLoading(false)
    }
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
          className="mt-[24] flex-row justify-start"
          onPress={handleGoBack}
          hitSlop={HIT_SLOP_DEFAULT}
        >
          <DmView className={clsx(I18nManager.isRTL && "rotate-[180deg]")}>
            <CloseIcon width={16} height={16} />
          </DmView>
        </DmView>
        <DmText className="mt-[57] text-16 leading-[25px] font-custom600">
          {t("password_reset")}
        </DmText>
        <DmText className="mt-[10] text-13 font-custom400 leading-[20px] mr-[56]">
          {t("enter_your_registered_email_we_will_send_descr")}
        </DmText>
        <DmView className="mt-[57] px-[24]">
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
            title={t("send")}
            onPress={() => handleSubmit(onSubmit)()}
            disable={isLoading}
            isLoading={isLoading}
          />
        </DmView>
      </KeyboardAwareScrollView>
      <MainModal
        isVisible={isErrorModalVisible}
        onClose={handleCloseErrorModal}
        title={t(responseError ? "error" : "email_not_found")}
        descr={responseError}
        titleBtn={t("re_enter_your_email")}
        onPress={handleCloseErrorModal}
        Icon={<CloseBigIcon />}
      />
    </SafeAreaView>
  )
}

export default PasswordResetScreen
