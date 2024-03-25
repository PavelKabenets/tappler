import React, { useEffect, useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderOnboarding from "components/HeaderOnboarding"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import VerifyCodeInput from "components/VerifyCodeInput"

// Hooks & Redux
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { setIsAuth } from "store/auth/slice"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

type Props = RootStackScreenProps<"email-verify">

const EmailVerifyScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  // State
  const [codeValue, setCodeValue] = useState("")
  // Global Store
  // Variables

  const dispatch = useDispatch()
  const { t } = useTranslation()
  // Refs
  // Methods
  // Handlers
  const hadnleSubmit = () => {
    navigation.navigate("registration-flow")
    dispatch(setIsAuth(true))
  }
  // @TO DO
  const handleResend = () => {
    //
  }

  const handleGoBack = () => {
    navigation.goBack()
  }
  // Hooks
  useEffect(() => {
    const timeout = setTimeout(() => {
      hadnleSubmit()
    }, 4000)
    return () => {
      clearInterval(timeout)
    }
  }, [])
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <DmView
        hitSlop={HIT_SLOP_DEFAULT}
        onPress={handleGoBack}
        className="w-full px-[15] pt-[31]"
      >
        <CloseIcon />
      </DmView>
      <DmView className="mt-[85]  px-[40]">
        <DmText className="text-center text-20 font-custom600">
          {t("an_email_has_been_sent")}
        </DmText>
        <DmText className="mt-[17] text-11 leading-[20px] text-center font-custom400">
          {t("we_sent_you_an_email_with_verification_descr")}
        </DmText>
        <DmView className="mt-[44]" onPress={handleResend}>
          <DmText className="text-center font-custom500 text-red text-11 leading-[29px]">
            {t("not_received_resend")}
          </DmText>
        </DmView>
      </DmView>
    </SafeAreaView>
  )
}

export default EmailVerifyScreen
