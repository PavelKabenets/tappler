import React from "react"

import { DmChecbox, DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import { BusinessHoursItemType } from "types"

import moment from "moment"

import styles from "./styles"
import clsx from "clsx"
import { isSmallPhone } from "helpers/helpers"

interface Props {
  item: BusinessHoursItemType
  onPress: (item: BusinessHoursItemType) => void
  onChangePress: (item: BusinessHoursItemType) => void
  isSelected?: boolean
}

const BusinessHoursItem: React.FC<Props> = ({
  item,
  onPress,
  onChangePress,
  isSelected,
}) => {
  const { t } = useTranslation()

  return (
    <DmView
      className="flex-row items-center justify-between py-[11] border-b-0.5 border-b-grey12"
      onPress={!isSelected ? () => onPress(item) : undefined}
    >
      <DmView className="mr-[24] flex-1">
        <DmChecbox
          onPress={isSelected ? () => onPress(item) : undefined}
          title={t(item.title)}
          variant="square"
          textClassName={clsx(
            "text-13 leading-[16px] font-custom400 flex-1",
            isSmallPhone && "text-11 leading-[14px]"
          )}
          className="flex-1"
          isChecked={isSelected}
        />
      </DmView>
      <DmView
        className="flex-row items-center justify-between"
        onPress={isSelected ? () => onChangePress(item) : undefined}
      >
        {isSelected && (
          <DmText className="text-13 leading-[16px] font-custom400 text-center">
            {moment(item.value.openAt).format("hh:mmA")} -{" "}
            {moment(item.value.closeAt).format("hh:mmA")}
          </DmText>
        )}
        {!isSelected && (
          <DmText className="text-13 leading-[16px] font-custom400 text-center">
            {t("closed")}
          </DmText>
        )}
      </DmView>
      <DmView
        className="flex-1"
        onPress={isSelected ? () => onChangePress(item) : undefined}
      >
        <DmText
          className={clsx(
            "ml-[24] text-13 leading-[16px] text-red font-custom400",
            "text-right"
          )}
        >
          {t("change")}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default BusinessHoursItem
