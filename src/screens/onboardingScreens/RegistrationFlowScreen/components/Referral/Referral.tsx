import React, { useEffect, useLayoutEffect, useState } from "react"

import { ActionBtn, DmChecbox, DmInput, DmText, DmView } from "components/UI"
import TitleRegistrationFlow from "components/TitleRegistrationFlow"

import { useTranslation } from "react-i18next"

import { ResultFlowDataType } from "types"

import styles from "./styles"
import colors from "styles/colors"

interface Props {
  result: ResultFlowDataType
  onNextStep: () => void
  onChangeResult: (obj: ResultFlowDataType) => void
  step: number
}

const Referral: React.FC<Props> = ({
  result,
  onNextStep,
  onChangeResult,
  step,
}) => {
  const [selectedType, setSelectedType] = useState<
    "google" | "youtube" | "tappler" | "friendsAndFamily" | "other"
  >()
  const [refCode, setRefCode] = useState("")

  const { t } = useTranslation()
  const hadnleSubmit = () => {
    if (selectedType && selectedType !== "tappler") {
      onChangeResult({ referral: { type: selectedType } })
      onNextStep()
    } else if (selectedType) {
      onChangeResult({ referral: { type: selectedType, code: refCode } })
      onNextStep()
    }
  }

  const handleSelect = (
    type: "google" | "youtube" | "tappler" | "friendsAndFamily" | "other"
  ) => {
    setSelectedType(type)
  }

  useEffect(() => {
    setSelectedType(result?.referral?.type)
    setRefCode(result?.referral?.code || "")
  }, [step === 9])

  useLayoutEffect(() => {
    if (selectedType !== "tappler") {
      onChangeResult({ isValid: !!selectedType })
    } else {
      onChangeResult({ isValid: !!selectedType && !!refCode })
    }
  }, [selectedType, refCode])

  useEffect(() => {
    if (selectedType) {
      onChangeResult({ referral: { type: selectedType, code: refCode } })
    }
  }, [selectedType, refCode])

  return (
    <DmView className="mt-[40] px-[17] flex-1 justify-between">
      <DmView className="pr-[43]">
        <TitleRegistrationFlow
          title={t("how_did_you_know_about_us")}
          classNameTitle="text-20 leading-[24px]"
        />
        <DmView className="mt-[29]">
          <DmChecbox
            title={t("google_search")}
            textClassName="font-custom400"
            onPress={() => handleSelect("google")}
            isChecked={selectedType === "google"}
          />
          <DmChecbox
            title={t("friend_or_family")}
            className="mt-[14]"
            textClassName="font-custom400"
            onPress={() => handleSelect("friendsAndFamily")}
            isChecked={selectedType === "friendsAndFamily"}
          />
          <DmChecbox
            title={t("youtube")}
            className="mt-[14]"
            textClassName="font-custom400"
            onPress={() => handleSelect("youtube")}
            isChecked={selectedType === "youtube"}
          />
          <DmChecbox
            title={t("tiktok")}
            className="mt-[14]"
            textClassName="font-custom400"
            onPress={() => handleSelect("other")}
            isChecked={selectedType === "other"}
          />
          <DmChecbox
            title={t("tappler_sales_person")}
            className="mt-[14]"
            textClassName="font-custom400"
            onPress={() => handleSelect("tappler")}
            isChecked={selectedType === "tappler"}
          />
          {selectedType === "tappler" && (
            <DmView className="mt-[7] pl-[32]">
              <DmInput
                placeholder={t("enter_salesperson_code")}
                placeholderTextColor={colors.grey6}
                inputClassName=""
                value={refCode}
                onChangeText={setRefCode}
              />
            </DmView>
          )}
        </DmView>
      </DmView>
    </DmView>
  )
}

export default Referral
