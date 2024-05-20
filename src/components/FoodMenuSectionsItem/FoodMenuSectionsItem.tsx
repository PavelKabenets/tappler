import React, { useState } from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import { MenuItemType, MenuSectionType } from "types"
import DotsIcon from "assets/icons/dots-vertical.svg"
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item"
import UnderlayLeftDelete from "components/UnderlayLeftDelete"
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler"
import { I18nManager } from "react-native"

interface Props {
  item: MenuSectionType
  onPress: (item: MenuSectionType) => void
  onDelete: (item: MenuSectionType) => void
}

const FoodMenuSectionsItem: React.FC<Props> = ({ item, onPress, onDelete }) => {
  const [pressToggle, setPressToggle] = useState(false)
  const { t } = useTranslation()

  const handleDelete = () => {
    onDelete(item)
  }

  const handlePress = () => {
    onPress(item)
    setPressToggle(true)
  }

  return (
    <GestureHandlerRootView>
      <SwipeableItem
        item={item}
        renderUnderlayLeft={
          !I18nManager.isRTL
            ? () => (
                <UnderlayLeftDelete
                  onDelete={handleDelete}
                  isPressToggle={pressToggle}
                  setPressToggle={setPressToggle}
                />
              )
            : undefined
        }
        renderUnderlayRight={
          I18nManager.isRTL
            ? () => (
                <UnderlayLeftDelete
                  onDelete={handleDelete}
                  isPressToggle={pressToggle}
                  setPressToggle={setPressToggle}
                />
              )
            : undefined
        }
        snapPointsLeft={I18nManager.isRTL ? undefined : [90]}
        snapPointsRight={!I18nManager.isRTL ? undefined : [90]}
      >
        <DmView className="pr-[16] bg-white">
          <TouchableOpacity onPress={handlePress}>
            <DmView className="pl-[14] py-[16] border-b-0.5 border-b-grey14 flex-row items-center">
              <DotsIcon />
              <DmView className="ml-[19]">
                <DmText className="text-13 leading-[16px] font-custom600">
                  {item.title}
                </DmText>
                <DmText className="mt-[10] text-13 leading-[16px] font-custom400">
                  {t("you_have_items_number", {
                    number: item.menuItems?.length,
                  })}
                </DmText>
              </DmView>
            </DmView>
          </TouchableOpacity>
        </DmView>
      </SwipeableItem>
    </GestureHandlerRootView>
  )
}

export default FoodMenuSectionsItem
