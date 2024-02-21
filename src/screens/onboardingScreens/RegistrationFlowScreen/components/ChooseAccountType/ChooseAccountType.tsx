import React, { useState } from "react"

import { DmChecbox, DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"

import styles from "./styles"
import { ResultFlowDataType } from "types"

interface Props {
  onNextStep: () => void
  onChangeResult: (obj: ResultFlowDataType) => void
}

const ChooseAccountType: React.FC<Props> = ({ onNextStep, onChangeResult }) => {
  const [selectedType, setSelectedType] = useState<"individual" | "business">()
  const { t } = useTranslation()

  const handleSelectCategory = (type: "individual" | "business") => {
    setSelectedType(type)
    onChangeResult({ accoutType: type })
    setTimeout(() => {
      onNextStep()
    }, 500)
  }

  return (
    <DmView className="mt-[31]">
      <DmText className="px-[20] text-16 font-custom600 leading-[19px]">
        {t("choose_account_type")}
      </DmText>
      <DmView
        className="px-[20] pb-[17] border-b-0.5 border-b-grey5"
        onPress={() => handleSelectCategory("individual")}
      >
        <DmChecbox
          className="mt-[31]"
          title={t("individual_account")}
          textClassName="text-13 leading-[16px] font-custom600"
          isChecked={selectedType === "individual"}
        />
        <DmText className="mt-[10] text-11 font-custom400">
          {t("choose_this_account_descr")}
        </DmText>
      </DmView>
      <DmView
        className="px-[20] pb-[17]"
        onPress={() => handleSelectCategory("business")}
      >
        <DmChecbox
          className="mt-[31]"
          title={t("business_account")}
          textClassName="text-13 leading-[16px] font-custom600"
          isChecked={selectedType === "business"}
        />
        <DmText className="mt-[10] text-11 font-custom400">
          {t("choose_this_account_business_descr")}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default ChooseAccountType
