import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import { MockSearchItemType } from "data/mockData"

import styles from "./styles"

interface Props {
  item: MockSearchItemType
  onPress: () => void
}

const GovornorateSearchItem: React.FC<Props> = ({ item, onPress }) => {
  const { t } = useTranslation()
  return (
    <DmView
      className="pt-[10] pb-[13] px-[18] flex-row items-center border-b-0.5 border-grey5"
      onPress={onPress}
    >
      {/* @TO DO */}
      <DmView className="w-[12] h-[12] bg-grey" />
      <DmView className="ml-[13] flex-1">
        <DmText className="text-13 font-custom600 leading-[16px] flex-1">
          {item.name}
        </DmText>
        <DmText className="text-11 font-custom400 flex-1">
          {t(item.area)} - {t(item.govornorate)}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default GovornorateSearchItem
