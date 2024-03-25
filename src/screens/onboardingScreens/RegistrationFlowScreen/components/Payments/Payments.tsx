import React, { useEffect, useLayoutEffect, useState } from "react"

import { ActionBtn, DmChecbox, DmText, DmView } from "components/UI"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

import { useTranslation } from "react-i18next"

import { ResultFlowDataType } from "types"

import styles from "./styles"

interface Props {
  result: ResultFlowDataType
  onNextStep: () => void
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
}

const Payments: React.FC<Props> = ({
  result,
  onNextStep,
  onChangeResult,
  step,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<
    ("cash" | "credit card")[]
  >([])

  const { t } = useTranslation()

  const hadnleSubmit = () => {
    onNextStep()
    onChangeResult({ payments: selectedTypes })
  }

  const handleSelect = (val: "cash" | "credit card") => {
    if (selectedTypes.includes(val)) {
      setSelectedTypes((prev) => prev.filter((item) => item !== val))
    } else {
      setSelectedTypes((prev) => [...prev, val])
    }
  }

  useEffect(() => {
    if (step === 5) {
      setSelectedTypes(result?.payments || [])
    }
  }, [step])

  useLayoutEffect(() => {
    onChangeResult({ isValid: !!selectedTypes.length })
  }, [!!selectedTypes.length])

  useEffect(() => {
    return () => {
      onChangeResult({ payments: selectedTypes })
    }
  }, [selectedTypes])

  return (
    <DmView className="mb-[28] mt-[24] px-[14] flex-1 justify-between">
      <DmView>
        <TitleRegistrationFlow
          title={t("accepted_payments")}
          descr={t("i_accept_the_following_payments_descr")}
        />
        <DmView>
          <DmChecbox
            title={t("cash")}
            className="mt-[11]"
            variant="square"
            onPress={() => handleSelect("cash")}
            isChecked={selectedTypes.includes("cash")}
            textClassName="flex-1"
          />
          <DmChecbox
            title={t("credit_cards")}
            className="mt-[13]"
            variant="square"
            onPress={() => handleSelect("credit card")}
            isChecked={selectedTypes.includes("credit card")}
            textClassName="flex-1"
          />
        </DmView>
      </DmView>
    </DmView>
  )
}

export default Payments
