import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"

import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native"
import { DmText, DmView } from "components/UI"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { useTranslation } from "react-i18next"

import {
  renderMontserratFontFamily,
  renderSansFontFamily,
} from "utils/renderFontFamily"

import styles from "./styles"
import clsx from "clsx"
import colors from "styles/colors"

interface Props extends TextInputProps {
  value?: string
  Icon?: React.ReactNode
  placeholder?: string
  inputClassName?: string
  style?: StyleProp<TextStyle>
  wrapperClassName?: string
  onIconPress?: () => void
  placeholderTextColor?: string
  subLabel?: string
  error?: string
}

const DmAuthInput: React.FC<Props> = ({
  value,
  Icon,
  placeholder,
  inputClassName,
  style,
  wrapperClassName,
  onIconPress,
  placeholderTextColor,
  subLabel,
  error,
  ...restProps
}) => {
  const [stylesFontFamilyState, setStylesFontFamilyState] = useState<{
    fontFamily: string
  }>({
    fontFamily: "Montserrat-Regular",
  })
  const { i18n } = useTranslation()

  const textSize = useSharedValue(13)
  const textTranslateY = useSharedValue(0)
  const marginLeftBorder = useSharedValue(0)

  const classNameGuard = useMemo(() => {
    let initialClassName = ""

    if (inputClassName) {
      initialClassName += inputClassName.replace(/custom(\d{3})/, "")
    }

    return initialClassName
  }, [inputClassName, i18n.language])

  const textSizeAnim = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(textSize.value),
      fontWeight: textSize.value === 11 ? "700" : "400",
    }
  })

  const textTranslateAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(textTranslateY.value),
        },
      ],
    }
  })

  const borderAnim = useAnimatedStyle(() => {
    return {
      marginLeft: withTiming(marginLeftBorder.value),
      transform: [
        {
          translateY: withTiming(marginLeftBorder.value ? -12 : 0),
        },
      ],
    }
  })

  useLayoutEffect(() => {
    if (
      inputClassName?.match(/custom(\d{3})/) &&
      !inputClassName?.match(/font/)
    ) {
      if (i18n.language === "en") {
        // Add fonts here
        renderMontserratFontFamily(inputClassName, setStylesFontFamilyState)
      }
      if (i18n.language === "ar") {
        // Add fonts here
        renderSansFontFamily(inputClassName, setStylesFontFamilyState)
      }
    } else if (!inputClassName?.match(/font/)) {
      if (i18n.language === "en") {
        // Add fonts here
        renderMontserratFontFamily("font-custom400", setStylesFontFamilyState)
      }
      if (i18n.language === "ar") {
        // Add fonts here
        renderSansFontFamily("font-custom400", setStylesFontFamilyState)
      }
    }
  }, [i18n.language, inputClassName])

  useEffect(() => {
    if (value) {
      textSize.value = 11
      textTranslateY.value = -27
      marginLeftBorder.value = 10
    } else {
      textSize.value = 13
      textTranslateY.value = 0
      marginLeftBorder.value = 0
    }
  }, [value])

  return (
    <DmView>
      <DmView className={clsx("justify-center", wrapperClassName)}>
        <Animated.View
          className="absolute flex-row items-center flex-wrap"
          style={textTranslateAnim}
        >
          <Animated.Text
            style={[
              textSizeAnim,
              stylesFontFamilyState,
              !value
                ? { color: placeholderTextColor || colors.greyPlaceholder }
                : { color: colors.black },
            ]}
            className="text-13 text-greyPlaceholder"
          >
            {placeholder}
          </Animated.Text>
          {!value && (
            <DmText className="ml-[17] text-11 text-greyPlaceholder font-custom400">
              {subLabel}
            </DmText>
          )}
        </Animated.View>
        <DmView
          className={clsx("w-full", {
            "flex-row items-center justify-between": !!Icon,
          })}
        >
          <TextInput
            value={value}
            {...restProps}
            className={clsx(
              "leading-[16px] h-[56] text-black",
              classNameGuard,
              !!Icon && "flex-1"
            )}
            style={[style, stylesFontFamilyState]}
            placeholderTextColor={placeholderTextColor}
          />
          {!!Icon && (
            <DmView className="ml-[12]" onPress={onIconPress}>
              {Icon}
            </DmView>
          )}
        </DmView>
        <Animated.View
          className={clsx(
            "border-b-0.5 border-grey1",
            !!error && "border-b-red"
          )}
          style={borderAnim}
        />
      </DmView>
      {!!error && <DmText className="mt-[4] text-13 text-red">{error}</DmText>}
    </DmView>
  )
}

export default DmAuthInput
