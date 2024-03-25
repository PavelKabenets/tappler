import React, { useEffect, useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"
import VerifyCodeInput from "components/VerifyCodeInput"
import VerifySuccessModal from "components/VerifySuccessModal"

import { useTranslation } from "react-i18next"

import { ResultFlowDataType } from "types"

import styles from "./styles"
import clsx from "clsx"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"
import { I18nManager } from "react-native"

interface Props {
  result: ResultFlowDataType
  onNextStep: () => void
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
}

const VerificationStep2: React.FC<Props> = ({
  onChangeResult,
  onNextStep,
  result,
  step,
}) => {
  const [code, setCode] = useState("")
  const [counter, setCounter] = useState(15)
  const [isVerifiDone, setVerifiDone] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [isVerifyModalVisible, setVerifyModalVisible] = useState(false)

  const { t } = useTranslation()

  const hadnleSubmit = () => {
    setLoading(true)
    const currTimerrId = setTimeout(() => {
      setLoading(false)
      handleOpenVerifyModal()
      if (intervalId) {
        clearInterval(intervalId)
      }
    }, 2000)
    setTimerId(currTimerrId)
  }

  const handleResend = () => {
    setCounter(15)
    if (timerId) {
      clearInterval(timerId)
      setTimerId(null)
    }
  }

  const handleOpenVerifyModal = () => {
    setVerifyModalVisible(true)
  }

  const handleCloseVerifyModal = () => {
    setVerifyModalVisible(false)
    setVerifiDone(true)
    onChangeResult({ isVerify: true })
  }

  useEffect(() => {
    if (isVerifiDone) {
      onNextStep()
    }
  }, [isVerifiDone])

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter < 1) {
        clearInterval(interval)
      }
      setCounter((prev) => {
        if (prev < 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    setIntervalId(interval)
    return () => {
      clearInterval(interval)
    }
  }, [step === 8, counter === 15])

  return (
    <DmView className="mt-[52] px-[31] flex-1 justify-between">
      <DmView>
        <TitleRegistrationFlow
          title={t("verifying_mobile_number")}
          descr={t("verification_code_has_been_sent_descr", {
            number: I18nManager.isRTL
              ? String(
                  "02 " + String(result?.phone).split("").reverse().join("")
                )
                  .split("")
                  .reverse()
                  .join("") + "+"
              : String("+20 " + String(result?.phone)),
          })}
          classNameDescr="text-11 leading-[26px]"
          classNameTitle="text-20 leading-[24px]"
        />
        <DmView className="mt-[27] px-[30]">
          <DmText className="text-11 text-red leading-[26px] font-custom400 text-center">
            {t("please_enter_the_OTP_code_here")}
          </DmText>
          <VerifyCodeInput
            initialValue={code}
            setCodeValue={setCode}
            className="mt-[13]"
          />
        </DmView>
        <ActionBtn
          title={t("verify")}
          onPress={hadnleSubmit}
          className="rounded-10 h-[44] mt-[30]"
          textClassName={clsx(
            "text-13 leading-[16px]",
            code.length < 4 ? "text-grey10 font-custom400" : "font-custom600"
          )}
          disable={code.length < 4}
          isLoading={isLoading}
        />
        <DmView className="mt-[22]">
          {counter > 0 && (
            <DmText className="text-11 leading-[29px] text-center text-grey2 font-custom500">
              {counter} {counter > 1 ? t("seconds") : t("second")}
            </DmText>
          )}
          <DmView
            onPress={counter < 1 && !isLoading ? handleResend : undefined}
            hitSlop={HIT_SLOP_DEFAULT}
          >
            <DmText
              className={clsx(
                "text-11 leading-[29px] text-center text-grey2 font-custom500",
                isLoading && counter > 0 && "text-grey10"
              )}
            >
              {t("resend_verification_code")}
            </DmText>
          </DmView>
        </DmView>
      </DmView>
      <VerifySuccessModal
        isVisible={isVerifyModalVisible}
        onClose={handleCloseVerifyModal}
      />
    </DmView>
  )
}

export default VerificationStep2
