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

type Props = RootStackScreenProps<"my-account-verify-mobile-number">

const MyAccountVerifyMobileNumberScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { phone } = route.params
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
  const { t } = useTranslation()
  const { user } = useTypedSelector((store) => store.auth)
  // Refs
  // Methods
  // Handlers
  const handleButtonPress = () => {
    navigation.navigate("my-account-phone-number", {
      isSuccessModalVisible: true,
    })
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
        onBackComponent={<CloseIcon />}
        className="px-[16] border-b-0"
      />
      <VerifyScreenComponent
        title={t("verify_mobile_number")}
        subtitle={t("verification_code_has_been_sent_descr", {
          number: phone,
        })}
        subtext={t("please_enter_the_code_here")}
        btn={t("verify")}
        onPress={handleButtonPress}
        onClose={handleModalClose}
        control={control}
        name={"code"}
        time={`15 ${t("seconds")}`}
        descr={t("resend_verification_code")}
      />
    </SafeAreaView>
  )
}

export default MyAccountVerifyMobileNumberScreen
