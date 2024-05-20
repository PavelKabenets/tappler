import React, { useEffect } from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import MinusIcon from "assets/icons/minus.svg"
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useTranslation } from "react-i18next"
import clsx from "clsx"

interface Props {
  item: { title: string; descr: string }
  className?: string
  isOpen: boolean
  onToggle: () => void
}

const ScoreAccordeonPerfomance: React.FC<Props> = ({
  item,
  className,
  isOpen,
  onToggle,
}) => {
  const ref = useAnimatedRef<Animated.View>()

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(-50)
  const { t } = useTranslation()
  const rotatePlus = useSharedValue(isOpen ? 0 : 90)

  useEffect(() => {
    if (isOpen) {
      opacity.value = 1
      translateY.value = 0
      rotatePlus.value = 0
    } else {
      opacity.value = 0
      translateY.value = -50
      rotatePlus.value = 90
    }
  }, [isOpen])

  const animStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 200 }),
      transform: [
        {
          translateY: withTiming(translateY.value, { duration: 200 }),
        },
      ],
    }
  }, [])

  const rotatePlusAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: withTiming(rotatePlus.value + "deg", { duration: 200 }),
        },
      ],
    }
  }, [])

  return (
    <DmView className={clsx("mb-[14]", className)} onPress={onToggle}>
      <DmView className="flex-row items-center justify-between">
        <DmText className="text-13 leading-[16px] py-[15px] text-black3 font-custom600 flex-1">
          {t(item.title)}
        </DmText>
        <DmView className="mr-[13]">
          <DmView>
            <MinusIcon />
          </DmView>
          <Animated.View className="absolute" style={rotatePlusAnim}>
            <MinusIcon />
          </Animated.View>
        </DmView>
      </DmView>
      {isOpen && (
        <Animated.View className="" style={animStyle}>
          <DmText className="text-12 leading-[20px] font-custom400">
            {t(item.descr)}
          </DmText>
        </Animated.View>
      )}
    </DmView>
  )
}

export default ScoreAccordeonPerfomance
