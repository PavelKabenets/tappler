import React, { useMemo, useState } from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"
import { SCREEN_WIDTH } from "helpers/helpers"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import colors from "styles/colors"
import { I18nManager } from "react-native"

interface Props {
  categories: string[]
  setSelectedCategory: (item: number) => void
  className?: string
}

const AnimatedSelectCategory: React.FC<Props> = ({
  categories,
  setSelectedCategory,
  className,
}) => {
  const leftOffset = useSharedValue(0)

  const itemWidth = useMemo(() => {
    return SCREEN_WIDTH / categories.length
  }, [categories])

  const anim = useAnimatedStyle(() => {
    return {
      height: 2,
      backgroundColor: colors.red,
      width: itemWidth,
      transform: [
        {
          translateX: withTiming(leftOffset.value),
        },
      ],
    }
  }, [categories])

  const handlePress = (idx: number) => {
    leftOffset.value = idx * itemWidth * (I18nManager.isRTL ? -1 : 1)
    setSelectedCategory(idx)
  }

  return (
    <DmView className={clsx("", className)}>
      <DmView className="flex-row items-center">
        {categories.map((item, idx) => (
          <DmView
            key={idx}
            style={{ width: itemWidth }}
            onPress={() => handlePress(idx)}
          >
            <DmText
              className="text-11 leading-[14px] font-custom600 text-center"
              numberOfLines={1}
            >
              {item}
            </DmText>
          </DmView>
        ))}
      </DmView>
      <DmView className="mt-[4.5] justify-center">
        <DmView className="absolute w-full h-[1] bg-grey29" />
        <Animated.View style={anim} />
      </DmView>
    </DmView>
  )
}

export default AnimatedSelectCategory
