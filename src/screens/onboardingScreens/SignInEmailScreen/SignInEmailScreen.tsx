import React, { useState } from "react"

// Components
import { ActionBtn, DmAuthInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import OnboardingFooter from "components/OnboardingFooter"
import ErrorModal from "components/ErrorModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import { emailRegExp } from "helpers/helpers"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import ArrowBackIcon from "assets/icons/arrow-back.svg"
import HideIcon from "assets/icons/hide-password.svg"
import colors from "styles/colors"
import { I18nManager } from "react-native"

type Props = RootStackScreenProps<"sign-in-email">

const SignInEmailScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isPasswordVisible, setPasswordVisible] = useState(true)
  const [isErrorModalVisible, setErrorModalVisible] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  // Global Store
  // Variables
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleTogglePasswordVisible = () => {
    setPasswordVisible((prev) => !prev)
  }

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleForgotPassword = () => {
    navigation.navigate("password-reset")
  }
  // @TO DO
  const onSubmit = () => {
    //
  }

  const handleOpenErrorModal = () => {
    setErrorModalVisible(true)
  }

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false)
  }

  const handleGoSignUpEmail = () => {
    navigation.navigate("sign-up-email")
  }

  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <DmView className="mt-[18]">
          <DmView>
            <DmView>
              <DmView
                className={
                  I18nManager.isRTL
                    ? "rotate-[180deg] flex-row justify-end"
                    : ""
                }
              >
                <DmView hitSlop={HIT_SLOP_DEFAULT} onPress={handleGoBack}>
                  <ArrowBackIcon width={14} height={14} />
                </DmView>
              </DmView>
            </DmView>
          </DmView>
          <DmText className="mt-[88] text-custom600 text-16 leading-[19px]">
            {t("log_in_to_your_account")}
          </DmText>
          <DmView className="pr-[2]">
            <Controller
              control={control}
              rules={{ required: true, pattern: emailRegExp }}
              render={({ field: { value, onChange } }) => (
                <DmAuthInput
                  value={value}
                  placeholder={t("your_email")}
                  onChangeText={onChange}
                  wrapperClassName="mt-[24]"
                />
              )}
              name="email"
            />
            {/* @TO DO */}
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DmAuthInput
                  value={value}
                  placeholder={t("your_password")}
                  onChangeText={onChange}
                  wrapperClassName="mt-[8]"
                  onIconPress={handleTogglePasswordVisible}
                  secureTextEntry={isPasswordVisible}
                  Icon={
                    <HideIcon
                      fill={
                        !isPasswordVisible
                          ? colors.black
                          : colors.greyPlaceholder
                      }
                    />
                  }
                />
              )}
              name="password"
            />
          </DmView>
          <DmView className="mt-[21]" onPress={handleForgotPassword}>
            <DmText className="font-custom400 text-red text-12 leading-[15px]">
              {t("forgot_your_password")}
            </DmText>
          </DmView>
          <DmView className="px-[34]">
            <ActionBtn
              className="mt-[32] h-[44]"
              onPress={() => handleSubmit(onSubmit, handleOpenErrorModal)()}
              title={t("log_In")}
            />
          </DmView>
          <DmView className="mt-[24]" onPress={handleGoSignUpEmail}>
            <DmText className="text-12 leading-[15px] font-custom400 text-center">
              {t("dont_have_an_account")}
              <DmText className="text-red text-12 leading-[15px] font-custom400 ">
                {" "}
                {t("sign_up")}
              </DmText>
            </DmText>
          </DmView>
        </DmView>
        <OnboardingFooter isLogoVisible />
      </KeyboardAwareScrollView>
      <ErrorModal
        isVisible={isErrorModalVisible}
        onClose={handleCloseErrorModal}
      />
    </SafeAreaView>
  )
}

export default SignInEmailScreen
