import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import { HIT_SLOP_DEFAULT } from "styles/helpersStyles"

import styles from "./styles"
import CircleCheckBoxIcon from "assets/icons/circle-checkbox.svg"
import { SubCategoryType } from "types"

// @TO DO
interface Props {
  item: SubCategoryType
  onPress: (item: SubCategoryType) => void
  onPressDetail: (item: SubCategoryType) => void
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
        <CircleCheckBoxIcon />
        <DmText className="ml-[5] text-12 leading-[15px] font-custom500 flex-1">
          {item.name}
        </DmText>
      </DmView>
      <DmView onPress={() => onPressDetail(item)} hitSlop={HIT_SLOP_DEFAULT}>
        <DmText className="ml-[14] font-custom400 text-red text-10 leading-[13px]">
          {t("service_details")}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default AllServicesSubItem
