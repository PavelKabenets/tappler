import React, { useState } from "react"

// Components
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import VerifyScreenComponent from "components/VerifyScreenComponent"
// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useTypedSelector } from "store"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"

type Props = RootStackScreenProps<"my-account-verify-email">

const MyAccountVerifyEmailScreen: React.FC<Props> = ({ navigation }) => {
  // Props
  // State
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      code: "",
    },
  })
  const [showModal, setShowModal] = useState(false)
  // Global Store
  // Variables
  const { user } = useTypedSelector((store) => store.auth)
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const handleButtonPress = () => {
    navigation.navigate("my-account-email", { isSuccessModalVisible: true })
  }
  const handleModalClose = () => {
    setShowModal(false)
  }
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding
        title={t("update_your_email")}
        onBackComponent={<CloseIcon />}
        className="px-[16]"
      />
      <VerifyScreenComponent
        title={t("update_email_address")}
        subtitle={t("verification_code_has_been_sent_to", {
          email: user?.email,
        })}
        subtext={t("please_enter_the_verification_code_here")}
        classNameSubtext="text-center"
        className="mt-[73]"
        btn={t("verify_email_address")}
        classNameBtn="px-[62]"
        onPress={handleButtonPress}
        onClose={handleModalClose}
        control={control}
        name={"code"}
        descr={t("resend_verification_code")}
      />
    </SafeAreaView>
  )
}

export default MyAccountVerifyEmailScreen
