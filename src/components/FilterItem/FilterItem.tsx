import React from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import ChevronRight from "assets/icons/chevron-right.svg"
import colors from "styles/colors"
import DoneIcon from "assets/icons/check-mark.svg"
import clsx from "clsx"
import { I18nManager } from "react-native"

interface Props {
  title: string
  titleChevron?: string
  onPress?: () => void
  isSelected?: boolean
  isChevronVisible?: boolean
  classNameTitle?: string
}

const FilterItem: React.FC<Props> = ({
  title,
  titleChevron,
  onPress,
  isSelected,
  isChevronVisible,
  classNameTitle,
}) => {
  const { t } = useTranslation()
  return (
    <DmView
      className="border-b-0.2 border-b-grey31 pl-[24] py-[28] mr-[24] flex-row items-center justify-between"
      onPress={onPress}
    >
      <DmText
        className={clsx(
          "text-13 leading-[16px] font-custom600",
          classNameTitle
        )}
      >
        {title}
      </DmText>
      {!isSelected && isChevronVisible && (
        <DmView className="flex-row items-center">
          <DmText className="mr-[4] text-grey2 text-12 leading-[15px] font-custom400">
            {titleChevron || t("all")}
          </DmText>
          <DmView className={clsx(I18nManager.isRTL && "scale-[-1]")}>
            <ChevronRight
              width={16}
              height={16}
              strokeWidth={2.5}
              stroke={colors.grey31}
            />
          </DmView>
        </DmView>
      )}
      {isSelected && (
        <DmView className="mr-[12]">
          <DoneIcon />
        </DmView>
      )}
    </DmView>
  )
}

export default FilterItem
