import React, { useState } from "react"

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

type Props = RootStackScreenProps<"update-email">

const UpdateEmailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  // State
  const [codeValue, setCodeValue] = useState("")
  // Global Store
  // Variables
  const { email } = route.params

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
  // Hooks
  // Listeners
  // Render Methods

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HeaderOnboarding title={t("update_your_email")} className="px-[20]" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <DmText className="mt-[72] text-center text-20 font-custom600">
          {t("update_email_address")}
        </DmText>
        <DmText className="mt-[17] text-11 leading-[22px]">
          {t("verification_code_has_been_sent_to_email_address")} {email}
        </DmText>
        <DmView className="mt-[38]">
          <DmText className="text-center text-11 leading-[26px] text-red">
            {t("please_enter_the_verification_code_here")}
          </DmText>
        </DmView>
        <VerifyCodeInput
          className="mt-[13]"
          setCodeValue={setCodeValue}
          initialValue={codeValue}
        />
        <ActionBtn
          title={t("verify_email_address")}
          className="mt-[26] w-full rounded-10"
          textClassName={clsx(codeValue.length < 4 && "text-grey10")}
          onPress={hadnleSubmit}
          disable={codeValue.length < 4}
        />
        <DmView onPress={handleResend}>
          <DmText className="mt-[26] text-11 text-grey2 leading-[29px] text-center">
            {t("resend_verification_code")}
          </DmText>
        </DmView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default UpdateEmailScreen
