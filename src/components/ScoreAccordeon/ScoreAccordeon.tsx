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
}

const ScoreAccordeon: React.FC<Props> = ({ item, className }) => {
  const ref = useAnimatedRef<Animated.View>()

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(-50)
  const { t } = useTranslation()
  const rotatePlus = useSharedValue(90)

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

  const handleToggleAccordion = () => {
    if (!opacity.value && translateY.value < 0) {
      opacity.value = 1
      translateY.value = 0
      rotatePlus.value = 0
    } else {
      opacity.value = 0
      translateY.value = -50
      rotatePlus.value = 90
    }
  }

  return (
    <DmView
      className={clsx("mb-[40]", className)}
      onPress={handleToggleAccordion}
    >
      <DmView className="flex-row items-center justify-between">
        <DmText className="text-13 leading-[16px] text-red font-custom600 flex-1 mr-[12]">
          {t(item.title)}
        </DmText>
        <DmView className="pr-[8]">
          <DmView>
            <MinusIcon />
          </DmView>
          <Animated.View className="absolute" style={rotatePlusAnim}>
            <MinusIcon />
          </Animated.View>
        </DmView>
      </DmView>
      <Animated.View className="mt-[20]" style={animStyle}>
        <Animated.View ref={ref}>
          <DmText className="text-12 leading-[20px] font-custom400">
            {t(item.descr)}
          </DmText>
        </Animated.View>
      </Animated.View>
    </DmView>
  )
}

export default ScoreAccordeon
