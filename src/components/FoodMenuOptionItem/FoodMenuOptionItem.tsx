import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import { FoodOptionType } from "types"
import clsx from "clsx"
import { useTranslation } from "react-i18next"

interface Props {
  item: FoodOptionType
  className?: string
}

const FoodMenuOptionItem: React.FC<Props> = ({ item, className }) => {
  const { t } = useTranslation()
  return (
    <DmView className={clsx("", className)}>
      <DmView className="flex-1">
        <DmText className="text-11 leading-[14px] font-custom700">
          {t("option")}
        </DmText>
        <DmText className="text-13 leading-[16px] font-custom500">
          {item.name}
        </DmText>
      </DmView>
      <DmText className="flex-[0.5] text-13 leading-[16px] font-custom500">
        {item.isRequired}
      </DmText>
      <DmView className="flex-[0.5]">
        <DmText className="flex-1 text-13 leading-[16px] font-custom500">
          {t("items_number", { number: item?.choices?.length })}
        </DmText>
        <DmView className="w-[15] h-[15] bg-grey ml-[12]" />
      </DmView>
    </DmView>
  )
}

export default FoodMenuOptionItem
