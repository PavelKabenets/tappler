import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import { FoodOptionType } from "types"
import { useTranslation } from "react-i18next"

import PencilIcon from "assets/icons/edit-pencil-note.svg"

interface Props {
  item: FoodOptionType
  onPress: (item: FoodOptionType) => void
  index: number
  className?: string
}

const MenuItemOptionsItem: React.FC<Props> = ({
  item,
  onPress,
  index,
  className,
}) => {
  const { t } = useTranslation()
  return (
    <DmView
      className="py-[16] flex-row items-center justify-between px-[14] border-t-0.5 border-grey1 mr-[14]"
      onPress={() => onPress({ ...item, index })}
    >
      <DmView className="flex-1">
        <DmText className="text-11 leading-[14px] font-custom700">
          {t("option")}
        </DmText>
        <DmText className="mt-[6] text-13 leading-[16px] font-custom500">
          {item.name}
        </DmText>
      </DmView>
      <DmView className="flex-1 flex-row items-center justify-between">
        <DmText className="text-13 leading-[16px] font-custom500">
          {t(item.isRequired ? "required" : "optional")}
        </DmText>
        <DmText className="text-13 leading-[16px] font-custom500">
          {item.choices.length} {t("items")}
        </DmText>
        <PencilIcon />
      </DmView>
    </DmView>
  )
}

export default MenuItemOptionsItem
