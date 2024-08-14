import React, { useRef, useState } from "react"

import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import { MenuItemType, MenuSectionType } from "types"
import DotsIcon from "assets/icons/dots-vertical.svg"
import SwipeableItem, {
  OpenDirection,
  SwipeableItemImperativeRef,
  useSwipeableItemParams,
} from "react-native-swipeable-item"
import UnderlayLeftDelete from "components/UnderlayLeftDelete"
import {
  GestureHandlerRootView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler"
import { I18nManager } from "react-native"
import { ScaleDecorator } from "react-native-draggable-flatlist"
import "react-native-gesture-handler"
import ReactNativeHapticFeedback from "react-native-haptic-feedback"
import { SCREEN_WIDTH } from "helpers/helpers"

interface Props {
  item: MenuSectionType
  onPress: (item: MenuSectionType) => void
  onDelete: (item: MenuSectionType) => void
  drag: () => void
  isActive: boolean
}

const FoodMenuSectionsItem: React.FC<Props> = ({
  item,
  onPress,
  onDelete,
  drag,
  isActive,
}) => {
  const [isOpen, setOpen] = useState(false)

  const { t } = useTranslation()
  const ref = useRef<SwipeableItemImperativeRef>(null)

  const handleDelete = () => {
    onDelete(item)
  }

  const handlePress = () => {
    if (isOpen) {
      setOpen(false)
      ref.current?.close()
    } else {
      onPress(item)
    }
  }

  const handleLongPress = () => {
    drag()
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    }
    ReactNativeHapticFeedback.trigger("impactLight", options)
  }

  const handleOpen = () => {
    ref.current?.open(
      I18nManager.isRTL ? OpenDirection.RIGHT : OpenDirection.LEFT
    )
    setOpen(true)
  }

  return (
    <GestureHandlerRootView>
      <SwipeableItem
        item={item}
        ref={ref}
        onChange={(params) => {
          setOpen(!!params.snapPoint)
        }}
        renderUnderlayLeft={
          !I18nManager.isRTL
            ? () => <UnderlayLeftDelete onDelete={handleDelete} />
            : undefined
        }
        renderUnderlayRight={
          I18nManager.isRTL
            ? () => <UnderlayLeftDelete onDelete={handleDelete} />
            : undefined
        }
        snapPointsLeft={I18nManager.isRTL ? undefined : [90]}
        snapPointsRight={!I18nManager.isRTL ? undefined : [90]}
      >
        <DmView className="pr-[16] bg-white">
          <DmView className=" flex-row items-center border-b-0.5 border-b-grey14">
            <ScaleDecorator>
              <TouchableOpacity
                className="pl-[14] pr-[19]"
                onLongPress={handleLongPress}
                // disabled={isActive}
              >
                <DotsIcon />
              </TouchableOpacity>
            </ScaleDecorator>
            <TouchableOpacity
              onPress={handlePress}
              style={{ width: SCREEN_WIDTH - 59 }}
            >
              <DmView>
                <DmView className="flex-1 py-[16] flex-row items-center w-full">
                  <DmView className="">
                    <DmText
                      className="text-13 leading-[16px] font-custom600 flex-1"
                      numberOfLines={1}
                    >
                      {item.title}
                    </DmText>
                    <DmText className="mt-[10] text-13 leading-[16px] font-custom400">
                      {t("you_have_items_number", {
                        number: item.menuItems?.length,
                      })}
                    </DmText>
                  </DmView>
                </DmView>
              </DmView>
            </TouchableOpacity>
          </DmView>
        </DmView>
      </SwipeableItem>
    </GestureHandlerRootView>
  )
}

export default FoodMenuSectionsItem
