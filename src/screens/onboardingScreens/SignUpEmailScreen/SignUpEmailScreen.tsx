import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmAuthInput, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import OnboardingFooter from "components/OnboardingFooter"

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

type Props = RootStackScreenProps<"sign-up-email">

const SignUpEmailScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const [isPasswordVisible, setPasswordVisible] = useState(true)

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
  // @TO DO
  const onSubmit = () => {
    navigation.navigate("update-email", { email: getValues("email") })
  }

  const hadnleGoSignInEmail = () => {
    navigation.navigate("sign-in-email")
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
      >
        <DmView>
          <DmView onPress={handleGoBack}>
            {/* @TO DO */}
            <DmView style={styles.emptyGoBack} hitSlop={HIT_SLOP_DEFAULT} />
          </DmView>
          <DmText className="mt-[88] text-custom600 text-16">
            {t("register_new_account")}
          </DmText>
          <DmView className="pr-[2]">
            <Controller
              control={control}
              rules={{
                pattern: { value: emailRegExp, message: t("email_error") },
                required: { value: true, message: t("required_error") },
              }}
              render={({ field: { value, onChange } }) => (
                <DmAuthInput
                  value={value}
                  placeholder={t("your_email")}
                  onChangeText={onChange}
                  wrapperClassName="mt-[24]"
                  error={errors.email?.message}
                  Icon={
                    !errors.email?.message &&
                    !!value && (
                      <DmView
                        style={styles.emptyEye}
                        hitSlop={HIT_SLOP_DEFAULT}
                      />
                    )
                  }
                />
              )}
              name="email"
            />
            {/* @TO DO */}
            <Controller
              control={control}
              rules={{
                required: { value: true, message: t("required_error") },
                validate: {
                  function: (value, formValues) =>
                    value === formValues.repeatPassword || t("repeat_error"),
                },
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
                  Icon={
                    !errors.password?.message &&
                    !!value && (
                      <DmView
                        style={styles.emptyEye}
                        hitSlop={HIT_SLOP_DEFAULT}
                      />
                    )
                  }
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
                    trigger("password")
                  }}
                  wrapperClassName="mt-[8]"
                  onIconPress={handleTogglePasswordVisible}
                  secureTextEntry={isPasswordVisible}
                  error={errors.repeatPassword?.message}
                  Icon={
                    !errors.repeatPassword?.message &&
                    !!value && (
                      <DmView
                        style={styles.emptyEye}
                        hitSlop={HIT_SLOP_DEFAULT}
                      />
                    )
                  }
                />
              )}
              name="repeatPassword"
            />
          </DmView>
          <DmView className="px-[34]">
            <ActionBtn
              className="mt-[32] h-[41]"
              onPress={() => handleSubmit(onSubmit)()}
              title={t("register_new_account")}
              textClassName="text-13"
            />
          </DmView>
          <DmView className="mt-[24]" onPress={hadnleGoSignInEmail}>
            <DmText className="text-12 font-custom400 text-center">
              {t("dont_have_an_account")}
              <DmText className="text-red text-12 font-custom400 ">
                {" "}
                {t("sign_in")}
              </DmText>
            </DmText>
          </DmView>
        </DmView>
        <OnboardingFooter isLogoVisible />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default SignUpEmailScreen
