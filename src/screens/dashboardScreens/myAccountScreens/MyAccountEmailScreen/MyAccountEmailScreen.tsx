import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmInput, DmText, DmView } from "components/UI"
import HeaderOnboarding from "components/HeaderOnboarding"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import VerifySuccessModal from "components/VerifySuccessModal"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { Controller, useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import EditPencilIcon from "assets/icons/edit.svg"

type Props = RootStackScreenProps<"my-account-email">

const MyAccountEmailScreen: React.FC<Props> = ({ route, navigation }) => {
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
      email: "",
    },
  })
  const emailValue = watch("email")
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  useEffect(() => {
    setShowErrorMessage(false)
  }, [emailValue])

  const onSubmit = (data: { email: string }) => {
    navigation.navigate("my-account-verify-email")
  }
  const handleButtonPress = () => {
    handleSubmit(onSubmit, () => setShowErrorMessage(true))()
  }
  // Global Store
  // Variables
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  // Refs
  // Methods
  // Handlers
  const handleModalClose = () => {
    navigation.navigate("my-account", { isSuccessModalVisible: false })
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView
      style={{ paddingBottom: insets.bottom > 45 ? 0 : 45 - insets.bottom }}
      className="flex-1 bg-white"
    >
      <HeaderOnboarding
        onBackComponent={<CloseIcon />}
        className="px-[16]"
        title={t("your_email")}
      />
      <DmText className="pt-[17] pb-[15] text-15 leading-[22px] font-custom400 px-[23]">
        {t("enter_your_email_address_we_will_send_you_an_otp_for_verification")}
      </DmText>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
        keyboardShouldPersistTaps="handled"
      >
        <DmView>
          <DmView className="px-[22]">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DmInput
                  className="h-[63] w-full"
                  inputClassName="text-15 leading-[19px] text-black"
                  value={value}
                  placeholder={t("email")}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="email"
            />
          </DmView>
        </DmView>
        {emailValue ? (
          <DmView className="px-[20] pt-[17] border-t-1 border-grey4">
            <ActionBtn
              onPress={handleButtonPress}
              textClassName="text-13 leading-[16px] font-custom600"
              className="h-[47] rounded-5"
              title={t("save")}
            />
          </DmView>
        ) : null}
      </KeyboardAwareScrollView>
      <VerifySuccessModal
        title={t("your_email_has_been_verified_successfully")}
        isVisible={!!isSuccessModalVisible}
        onClose={handleModalClose}
      />
    </SafeAreaView>
  )
}

export default MyAccountEmailScreen
