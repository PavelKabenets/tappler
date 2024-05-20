import React, { useState } from "react"

// Components
import { ActionBtn, DmText, DmView } from "components/UI"
import { SafeAreaView } from "react-native-safe-area-context"

// Hooks & Redux
import { useTranslation } from "react-i18next"

// Helpers & Types
import { RootStackScreenProps } from "navigation/types"

// Libs & Utils

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"
import VerifyCodeInput from "components/VerifyCodeInput"
import CloseIcon from "assets/icons/close.svg"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import { useAuthResetConfirmMutation } from "services/api"
import { ErrorSignUpEmailType } from "types"
import MainModal from "components/MainModal"
import CloseBigIcon from "assets/icons/cancel-big.svg"

type Props = RootStackScreenProps<"password-reset-code">

const PasswordResetCodeScreen: React.FC<Props> = ({ route, navigation }) => {
  // Props
  const { email } = route.params
  // State
  const [code, setCode] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [responseError, setResponseError] = useState<string>()
  // Global Store
  // Variables
  const { t, i18n } = useTranslation()
  const [confirmSend] = useAuthResetConfirmMutation()
  // Refs
  // Methods
  // Handlers
  const hadnleSubmit = async () => {
    try {
      setLoading(true)
      await confirmSend({
        email,
        // @TO DO
        userType: "pro",
        confirmationCode: code,
        lang: i18n.language,
      }).unwrap()
      navigation.navigate("password-change", {
        email,
        // @TO DO
        userType: "pro",
        confirmationCode: code,
        lang: i18n.language,
      })
    } catch (e) {
      console.log("Send Code Confirm Error: ", e)
      setResponseError(
        Object.entries((e as ErrorSignUpEmailType).data.validationErrors)?.map(
          (item) => item[1][0]
        )[0]
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClearResponseError = () => {
    setResponseError(undefined)
  }
  // Hooks
  // Listeners
  // Render Methods

  console.log(responseError)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <DmView
        hitSlop={HIT_SLOP_DEFAULT}
        onPress={navigation.goBack}
        className="w-full px-[15] pt-[23]"
      >
        <CloseIcon />
      </DmView>
      <DmView className="mt-[105]">
        <DmText className="text-20 leading-[24px] font-custom600 text-center">
          {t("reset_password")}
        </DmText>
        <DmText className="mt-[5] font-custom400 text-11 leading-[20px] text-center">
          {t("verification_code_has_been_sent_to", { email })}
        </DmText>
      </DmView>
      <DmView className="px-[31]">
        <DmView className="mt-[70] px-[30]">
          <DmText className="text-11 text-red leading-[26px] font-custom400 text-center">
            {t("please_enter_the_verification_code_here")}
          </DmText>
          <VerifyCodeInput
            initialValue={code}
            setCodeValue={setCode}
            className="mt-[13]"
          />
        </DmView>
        <ActionBtn
          title={t("verify_email_address")}
          onPress={hadnleSubmit}
          className="mx-[26] rounded-10 h-[44] mt-[30]"
          textClassName={clsx(
            "text-13 leading-[16px]",
            code.length < 4 ? "text-grey10 font-custom400" : "font-custom600"
          )}
          disable={code.length < 4 || isLoading}
          isLoading={isLoading}
        />
        <DmView
          className="mt-[20]"
          onPress={navigation.goBack}
          hitSlop={HIT_SLOP_DEFAULT}
        >
          <DmText
            className={clsx(
              "text-11 leading-[29px] text-center text-grey2 font-custom500"
            )}
          >
            {t("resend_verification_code")}
          </DmText>
        </DmView>
      </DmView>
      <MainModal
        isVisible={!!responseError}
        onClose={handleClearResponseError}
        title={responseError}
        titleBtn={t("OK")}
        onPress={handleClearResponseError}
        titleBtnSecond={t("reset_password")}
        classNameTitle="mt-[10] text-13 leading-[16px] font-custom500"
        classNameBtnsWrapper="mt-[27]"
        classNameBtns="h-[34] px-[0]"
        className="px-[17] pt-[26]"
        Icon={<CloseBigIcon />}
      />
    </SafeAreaView>
  )
}

export default PasswordResetCodeScreen
