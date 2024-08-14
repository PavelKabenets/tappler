import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useTypedSelector } from "store"
import { useForm } from "react-hook-form"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import styles from "./styles"

type Props = RootStackScreenProps<"my-account-reset-password">

const MyAccountResetPasswordScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  // Global Store
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      password: "",
    },
  })
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const { user } = useTypedSelector((store: any) => store.auth)
  const onSubmit = (data: { password: string }) => {
    navigation.navigate("my-account-verify-password")
  }
  const handleButtonPress = () => {
    handleSubmit(onSubmit, () => setShowErrorMessage(true))()
  }
  // Variables
  const { t } = useTranslation()
  const maskEmail = (email: string) => {
    const [localPart, domainPart] = email.split("@")
    const maskedLocalPart = localPart.slice(0, 2) + "****"
    const maskedDomain = "*****" + domainPart.slice(domainPart.lastIndexOf("."))
    return maskedLocalPart + "@" + maskedDomain
  }
  // Refs
  // Methods
  // Handlers
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding className="px-[15] border-b-0" />
      <DmText className="text-16 leading-[25px] text-black font-custom600 pt-[53] px-[20]">
        {t("password_reset")}
      </DmText>
      <DmText className="text-13 leading-[20px] text-black font-custom400 pt-[10] px-[20]">
        {t("password_reset_descr_email", { email: maskEmail(user?.email) })}
      </DmText>
      <DmView className="px-[20] pt-[45]">
        <ActionBtn
          onPress={handleButtonPress}
          textClassName="text-13 leading-[16px] font-custom600 tracking-[0.65]"
          className="h-[44] rounded-10"
          title={t("send_OTP_to_my_email")}
        />
      </DmView>
    </SafeAreaView>
  )
}

export default MyAccountResetPasswordScreen
