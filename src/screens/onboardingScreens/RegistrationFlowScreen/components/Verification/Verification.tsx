import React, { useEffect, useState } from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

import { ResultFlowDataType } from "types"

import styles from "./styles"
import CameraIcon from "assets/icons/camera.svg"
import PhoneInput from "components/PhoneInput"
import clsx from "clsx"
import colors from "styles/colors"

interface Props {
  result: ResultFlowDataType
  onNextStep: () => void
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
}

const Verification: React.FC<Props> = ({
  onChangeResult,
  onNextStep,
  result,
  step,
}) => {
  const [phone, setPhone] = useState(result?.phone || "")

  const { t } = useTranslation()

  const hadnleSubmit = () => {
    onChangeResult({ phone })
    onNextStep()
  }

  useEffect(() => {
    if (step === 7 && result?.phone) {
      setPhone(result.phone)
    }
  }, [step])

  return (
    <DmView className="mt-[24] px-[34] flex-1 justify-between">
      <DmView>
        <TitleRegistrationFlow
          title={t("adding_mobile_number")}
          descr={t("we_will_send_you_a_verification_code")}
          classNameDescr="leading-[22px] text-13 text-grey13"
          classNameTitle="text-20 leading-[24px]"
        />
        <DmText className="mt-[40] text-11 text-red font-custom500">
          {t("enter_mobile_number")}
        </DmText>
        <PhoneInput
          className="mt-[27]"
          value={phone}
          onChangeText={setPhone}
          maxLength={11}
          placeholder="01XXXXXXXXX"
          placeholderTextColor={colors.greyPlaceholder}
        />
        <ActionBtn
          title={t("send_verification_code")}
          onPress={hadnleSubmit}
          className="rounded-10 h-[44] mt-[27]"
          textClassName={clsx("text-13 leading-[16px]",
            phone.length < 11 ? "text-grey10 font-custom400" : "font-custom600"
          )}
          disable={phone.length < 11}
        />
      </DmView>
    </DmView>
  )
}

export default Verification
