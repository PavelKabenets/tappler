import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"

import {
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  I18nManager,
} from "react-native"
import { DmText, DmView } from "components/UI"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { useTranslation } from "react-i18next"

import { isSmallPhone, takeFontFamily } from "helpers/helpers"

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
  containerClassName?: string
  multiline?: boolean
  errorClassName?: string
}

const withTimingConfig = {
  duration: 100,
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
  containerClassName,
  multiline,
  errorClassName,
  ...restProps
}) => {
  const [stylesFontFamilyState, setStylesFontFamilyState] = useState<
    | {
        fontFamily: string
        lineHeight?: number
      }
    | undefined
  >(undefined)
  const [
    stylesFontFamilyPlaceholderState,
    setStylesFontFamilyPlaceholderState,
  ] = useState<
    | {
        fontFamily: string
        lineHeight?: number
      }
    | undefined
  >(undefined)
  const { i18n } = useTranslation()

  const textSize = useSharedValue(13)
  const textTranslateY = useSharedValue(0)
  const marginLeftBorder = useSharedValue(0)

  const classNameGuard = useMemo(() => {
    let initialClassName = "leading-[16px] "

    if (inputClassName) {
      initialClassName += inputClassName.replace(/custom(\d{3})/, "")
    }

    return initialClassName
  }, [inputClassName, i18n.language])

  const textSizeAnim = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(textSize.value, withTimingConfig),
    }
  })

  const textTranslateAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(textTranslateY.value, withTimingConfig),
        },
      ],
    }
  })

  const borderAnim = useAnimatedStyle(() => {
    return {
      marginLeft: withTiming(marginLeftBorder.value, withTimingConfig),
      transform: [
        {
          translateY: withTiming(
            marginLeftBorder.value ? -12 : 0,
            withTimingConfig
          ),
        },
      ],
    }
  })

  useLayoutEffect(() => {
    if (
      inputClassName?.match(/custom(\d{3})/) &&
      !inputClassName?.match(/font/)
    ) {
      setStylesFontFamilyState(takeFontFamily(inputClassName, i18n.language))
      setStylesFontFamilyPlaceholderState(
        takeFontFamily(inputClassName, i18n.language)
      )
    } else if (!inputClassName?.match(/font/)) {
      setStylesFontFamilyState(
        takeFontFamily("font-custom400 leading-[16px]", i18n.language)
      )
      setStylesFontFamilyPlaceholderState(
        takeFontFamily("font-custom400 leading-[16px]", i18n.language)
      )
    }
  }, [i18n.language, inputClassName])

  useLayoutEffect(() => {
    if (value?.length) {
      setStylesFontFamilyPlaceholderState(
        takeFontFamily("font-custom700 leading-[16px]", i18n.language)
      )
    } else {
      setStylesFontFamilyPlaceholderState(
        takeFontFamily(
          inputClassName || "font-custom400 leading-[16px]",
          i18n.language
        )
      )
    }
  }, [!!value])

  useEffect(() => {
    if (value) {
      textSize.value = 11
      if (!multiline) {
        textTranslateY.value = -27
      } else {
        textTranslateY.value = -23
      }
      marginLeftBorder.value = 10
    } else {
      textSize.value = 13
      textTranslateY.value = 0
      marginLeftBorder.value = 0
    }
  }, [value])

  return (
    <DmView className={clsx(containerClassName)}>
      <DmView
        className={clsx(
          !multiline && "justify-center",
          multiline && Platform.OS === "ios" && "mt-[4]",
          wrapperClassName
        )}
      >
        <Animated.View
          className="absolute flex-row items-center flex-wrap"
          style={textTranslateAnim}
        >
          <Animated.Text
            className={clsx(
              "text-13 text-greyPlaceholder",
              Platform.OS === "android" && "ml-[4]",
              multiline
                ? Platform.OS === "android"
                  ? "mt-[23]"
                  : "mt-[13]"
                : ""
            )}
            style={[
              textSizeAnim,
              stylesFontFamilyPlaceholderState,
              !value
                ? { color: placeholderTextColor || colors.greyPlaceholder }
                : { color: colors.black },
            ]}
          >
            {placeholder}
          </Animated.Text>
          {!value && (
            <DmText
              className={clsx(
                "ml-[17] text-11 text-greyPlaceholder font-custom400",
                isSmallPhone && "text-10"
              )}
            >
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
              "h-[56] text-black",
              classNameGuard,
              !!Icon && "flex-1"
            )}
            style={[
              I18nManager.isRTL && {
                textAlign: "right",
                writingDirection: "rtl",
              },
              style,
              stylesFontFamilyState,
              multiline && styles.multiline,
            ]}
            placeholderTextColor={placeholderTextColor}
            multiline={multiline}
          />
          {!!Icon && (
            <DmView className="ml-[12]" onPress={onIconPress}>
              {Icon}
            </DmView>
          )}
        </DmView>
      </DmView>
      <Animated.View
        className={clsx("border-b-0.5 border-grey1", !!error && "border-b-red")}
        style={borderAnim}
      />
      {!!error && (
        <DmText
          className={clsx(
            "mt-[4] text-13 font-custom500 text-red",
            errorClassName
          )}
        >
          {error}
        </DmText>
      )}
    </DmView>
  )
}

export default DmAuthInput
