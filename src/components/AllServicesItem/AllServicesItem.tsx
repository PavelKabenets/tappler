import React from "react"

import { DmText, DmView } from "components/UI"

import { MockAllServicesItemType } from "data/mockData"

import styles from "./styles"
import ChevronRight from "assets/icons/chevron-right.svg"
import colors from "styles/colors"
import clsx from "clsx"
import { ServiceCategoryType } from "types"
import { I18nManager } from "react-native"

// @TO DO
interface Props {
  item: ServiceCategoryType
  onPress: (item: ServiceCategoryType) => void
  variant?: "red"
  className?: string
}

const AllServicesItem: React.FC<Props> = ({
  item,
  onPress,
  variant,
  className,
}) => {
  return (
    <DmView
      className={clsx(
        "py-[17] px-[19] border-b-1 border-b-grey8 flex-row items-center justify-between",
        className
      )}
      onPress={() => onPress(item)}
    >
      <DmText
        className={clsx(
          "text-12 font-custom500 leading-[15px]",
          variant === "red" && "text-11 text-red"
        )}
      >
        {item.name}
      </DmText>
      {/* @TO DO */}
      {variant !== "red" && (
        <DmView className={clsx(I18nManager.isRTL && "rotate-[180deg]")}>
          <ChevronRight stroke={colors.black} width={16} height={16} />
        </DmView>
      )}
    </DmView>
  )
}

export default AllServicesItem
