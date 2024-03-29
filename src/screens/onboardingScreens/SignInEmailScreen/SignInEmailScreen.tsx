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
  // @TO DO
  const handleForgotPassword = () => {
    //
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
      >
        <DmView>
          <DmView onPress={handleGoBack}>
            {/* @TO DO */}
            <DmView style={styles.emptyGoBack} hitSlop={HIT_SLOP_DEFAULT} />
          </DmView>
          <DmText className="mt-[88] text-custom600 text-16">
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
                    <DmView
                      style={styles.emptyEye}
                      hitSlop={HIT_SLOP_DEFAULT}
                    />
                  }
                />
              )}
              name="password"
            />
          </DmView>
          <DmView className="mt-[21]" onPress={handleForgotPassword}>
            <DmText className="font-custom400 text-red text-12">
              {t("forgot_your_password")}
            </DmText>
          </DmView>
          <DmView className="px-[34]">
            <ActionBtn
              className="mt-[32] h-[41]"
              onPress={() => handleSubmit(onSubmit, handleOpenErrorModal)()}
              title={t("log_In")}
            />
          </DmView>
          <DmView className="mt-[24]" onPress={handleGoSignUpEmail}>
            <DmText className="text-12 font-custom400 text-center">
              {t("dont_have_an_account")}
              <DmText className="text-red text-12 font-custom400 ">
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
