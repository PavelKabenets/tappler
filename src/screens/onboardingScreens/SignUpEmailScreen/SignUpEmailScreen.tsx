import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmAuthInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import OnboardingFooter from "components/OnboardingFooter"
import MainModal from "components/MainModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"
import { useProsSignUpMutation } from "services/api"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import { emailRegExp } from "helpers/helpers"
import { ErrorSignUpEmailType } from "types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import ArrowBackIcon from "assets/icons/arrow-back.svg"
import CheckIcon from "assets/icons/check-mark.svg"
import ExistIcon from "assets/icons/email-exist.svg"
import { I18nManager } from "react-native"
import { returnErrorMessageArr } from "utils/returnErrorMessage"

type Props = RootStackScreenProps<"sign-up-email">

const SignUpEmailScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isPasswordVisible, setPasswordVisible] = useState(true)
  const [signUp, { isLoading }] = useProsSignUpMutation()
  const [responseError, setResponseError] = useState<ErrorSignUpEmailType>()

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  })
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleTogglePasswordVisible = () => {
    setPasswordVisible((prev) => !prev)
  }

  const handleGoBack = () => {
    navigation.goBack()
  }

  const onSubmit = async () => {
    try {
      const res = await signUp({
        email: getValues("email"),
        password: getValues("password"),
        lang: i18n.language,
      }).unwrap()
      navigation.navigate("email-verify", { email: getValues("email") })
    } catch (e) {
      console.log("Sign Up Error: ", e)
      setResponseError(e as ErrorSignUpEmailType)
    }
  }

  const handleClearResponseError = () => {
    setResponseError(undefined)
  }

  const handleGoSignInEmail = () => {
    handleClearResponseError()
    navigation.navigate("sign-in-email")
  }

  const handleGoResetPassword = () => {
    handleClearResponseError()
    navigation.navigate("password-reset")
  }

  useEffect(() => {
    if (watch("email")) {
      trigger("email")
    }
    if (watch("password")) {
      trigger("password")
    }
    if (watch("repeatPassword")) {
      trigger("repeatPassword")
    }
  }, [watch("email"), watch("password"), watch("repeatPassword")])
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
        <DmView className="mt-[24]">
          <DmView>
            <DmView hitSlop={HIT_SLOP_DEFAULT}>
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
          <DmText className="mt-[88] font-custom600 text-16 leading-[19px]">
            {t("register_new_account")}
          </DmText>
          <DmView className="pr-[2]">
            <Controller
              control={control}
              rules={{
                required: { value: true, message: t("required_error") },
              }}
              render={({ field: { value, onChange } }) => (
                <DmAuthInput
                  value={value}
                  placeholder={t("your_email")}
                  onChangeText={(val) => onChange(val.toLowerCase())}
                  wrapperClassName="mt-[24]"
                  error={errors.email?.message}
                  Icon={!errors.email?.message && !!value && <CheckIcon />}
                />
              )}
              name="email"
            />
            {/* @TO DO */}
            <Controller
              control={control}
              rules={{
                required: { value: true, message: t("required_error") },
                minLength: { value: 6, message: t("length_error") },
              }}
              render={({ field: { value, onChange } }) => (
                <DmAuthInput
                  value={value}
                  placeholder={t("your_password")}
                  onChangeText={(val) => {
                    onChange(val)
                    trigger("repeatPassword")
                  }}
                  wrapperClassName="mt-[8]"
                  onIconPress={handleTogglePasswordVisible}
                  secureTextEntry={isPasswordVisible}
                  subLabel={t("password_must_be_6_characters_minimum")}
                  error={errors.password?.message}
                  Icon={!errors.password?.message && !!value && <CheckIcon />}
                />
              )}
              name="password"
            />
            {/* @TO DO */}
            <Controller
              control={control}
              rules={{
                required: { value: true, message: t("required_error") },
                validate: {
                  function: (value, formValues) =>
                    value === formValues.password || t("repeat_error"),
                },
                minLength: { value: 6, message: t("length_error") },
              }}
              render={({ field: { value, onChange } }) => (
                <DmAuthInput
                  value={value}
                  placeholder={t("re_type_your_password")}
                  onChangeText={(val) => {
                    onChange(val)
                  }}
                  wrapperClassName="mt-[8]"
                  onIconPress={handleTogglePasswordVisible}
                  secureTextEntry={isPasswordVisible}
                  error={errors.repeatPassword?.message}
                  Icon={
                    !errors.repeatPassword?.message && !!value && <CheckIcon />
                  }
                />
              )}
              name="repeatPassword"
            />
          </DmView>
          <DmView className="px-[34]">
            <ActionBtn
              className="mt-[32] h-[44]"
              onPress={() => handleSubmit(onSubmit)()}
              title={t("register_new_account")}
              textClassName="text-13 leading-[19px] font-custom600"
              isLoading={isLoading}
              disable={isLoading}
            />
          </DmView>
          <DmView className="mt-[24]" onPress={handleGoSignInEmail}>
            <DmText className="text-12 leading-[15px] font-custom400 text-center">
              {t("already_have_an_account")}
              <DmText className="text-red text-12 leading-[15px] font-custom400 ">
                {" "}
                {t("sign_in")}
              </DmText>
            </DmText>
          </DmView>
        </DmView>
        <DmView className="mt-[100]">
          <OnboardingFooter isLogoVisible />
        </DmView>
      </KeyboardAwareScrollView>
      <MainModal
        isVisible={!!responseError}
        onClose={handleClearResponseError}
        isBtnsTwo
        onPressSecond={handleGoResetPassword}
        onPress={handleGoSignInEmail}
        title={
          responseError?.data?.message
            ? returnErrorMessageArr(responseError)[0]
            : t("error")
        }
        titleBtn={t("login")}
        titleBtnSecond={t("reset_password")}
        classNameTitle="mt-[10] text-13 leading-[25px] font-custom500"
        classNameBtnsWrapper="mt-[27]"
        classNameBtns="h-[34] px-[0]"
        className="px-[17] pt-[26]"
        Icon={
          <DmView className="mr-[0]">
            <ExistIcon />
          </DmView>
        }
      />
    </SafeAreaView>
  )
}

export default SignUpEmailScreen
