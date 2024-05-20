import React, { Dispatch, SetStateAction, useState } from "react"

import { DmChecbox, DmText, DmView } from "components/UI"
import MainModal from "components/MainModal"

import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import styles from "./styles"

interface Props {
  isVisible: boolean
  onClose: () => void
  selectedType: "ASC" | "DESC" | "nearest_to_me"
  setSelectedType: Dispatch<SetStateAction<"ASC" | "DESC" | "nearest_to_me">>
}

const SortModal: React.FC<Props> = ({
  isVisible,
  onClose,
  selectedType,
  setSelectedType,
}) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const handleSelectType = (type: "ASC" | "DESC" | "nearest_to_me") => {
    setSelectedType(type)
    onClose()
  }
  return (
    <MainModal
      isVisible={isVisible}
      onClose={onClose}
      classNameModal="m-0 p-0 justify-end"
      className="pt-[10] px-[0] pb-[0] bg-white rounded-10"
      isFadeInOut={false}
    >
      <DmView
        className="items-center"
        style={{
          paddingBottom:
            insets.bottom > 34 ? insets.bottom - (insets.bottom - 34) : 34,
        }}
      >
        <DmView className="w-[21] h-[3] bg-grey2 rounded-20" />
        <DmText className="mt-[13] text-18 leading-[22px] font-custom700">
          {t("sort")}
        </DmText>
        <DmView className="w-full">
          <DmChecbox
            title={t("ASC")}
            onPress={() => handleSelectType("ASC")}
            isChecked={selectedType === "ASC"}
            className="px-[20] py-[10] border-b-0.3 border-grey5"
            textClassName="flex-1"
            variant="custom"
          />
          <DmChecbox
            title={t("DESC")}
            onPress={() => handleSelectType("DESC")}
            isChecked={selectedType === "DESC"}
            className="px-[20] py-[10] border-b-0.3 border-grey5"
            textClassName="flex-1"
            variant="custom"
          />
          <DmChecbox
            title={t("nearest_to_me")}
            // onPress={() => handleSelectType("nearest_to_me")}
            isChecked={selectedType === "nearest_to_me"}
            className="px-[20] py-[10] border-b-0.3 border-grey5 opacity-30"
            textClassName="flex-1"
            variant="custom"
          />
        </DmView>
      </DmView>
    </MainModal>
  )
}

export default SortModal
