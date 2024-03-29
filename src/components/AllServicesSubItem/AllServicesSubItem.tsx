import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import { MockAllServicesSubItemType } from "data/mockData"
import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

import styles from "./styles"

// @TO DO
interface Props {
  item: MockAllServicesSubItemType
  onPress: (item: MockAllServicesSubItemType) => void
  onPressDetail: () => void
}

const AllServicesSubItem: React.FC<Props> = ({
  item,
  onPress,
  onPressDetail,
}) => {
  const { t } = useTranslation()
  return (
    <DmView
      className="py-[14] px-[14] border-b-1 border-b-grey8 flex-row items-center justify-between"
      onPress={() => onPress(item)}
    >
      <DmView className="flex-row items-center flex-1">
        {/* @TO DO */}
        <DmView className="w-[20] h-[20] rounded-full bg-grey" />
        <DmText className="ml-[5] text-12 font-custom500 flex-1">
          {item.title}
        </DmText>
      </DmView>
      <DmView onPress={onPressDetail} hitSlop={HIT_SLOP_DEFAULT}>
        <DmText className="ml-[14] font-custom400 text-red text-10">
          {t("service_details")}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default AllServicesSubItem
