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

import { useTranslation } from "react-i18next"

import styles from "./styles"

import clsx from "clsx"
import { takeFontFamily } from "helpers/helpers"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import colors from "styles/colors"

interface Props extends TextInputProps {
  value?: string
  className?: string
  Icon?: React.ReactNode
  IconRight?: React.ReactNode
  inputClassName?: string
  style?: StyleProp<TextStyle>
  onPress?: () => void
  placeholder?: string
  placeholderTextColor?: string
  label?: string
  multiline?: boolean
  isAnimText?: boolean
}

const withTimingConfig = {
  duration: 100,
}

const DmInput: React.FC<Props> = ({
  value,
  className,
  Icon,
  inputClassName,
  style,
  onPress,
  placeholder,
  placeholderTextColor,
  IconRight,
  label,
  multiline,
  isAnimText = true,
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

  const classNameGuard = useMemo(() => {
    let initialClassName = ""

    if (inputClassName) {
      initialClassName += inputClassName.replace(/custom(\d{3})/, "")
    }

    return initialClassName
  }, [inputClassName, i18n.language])

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
          (inputClassName || "") + " font-custom400 leading-[16px]",
          i18n.language
        )
      )
    }
  }, [!!value])

  useEffect(() => {
    if (value && isAnimText) {
      textSize.value = 11
      if (multiline) {
        if (Platform.OS === "android") {
          textTranslateY.value = -10
        } else {
          textTranslateY.value = -7
        }
      } else {
        textTranslateY.value = -13
      }
    } else {
      textSize.value = 13
      textTranslateY.value = 0
    }
  }, [value])

  return (
    <DmView
      className={clsx(
        "px-[16] border-1 border-grey5 rounded-4 flex-row items-center",
        !!isAnimText && !multiline && "h-[55]",
        !!Icon && "pl-[10] pr-[16]",
        !isAnimText && "h-[39]",
        className
      )}
      onPress={onPress}
    >
      {!!Icon && <DmView className="mr-[14]">{Icon}</DmView>}
      <DmView className={clsx("flex-1", !multiline && "justify-center")}>
        {!!placeholder && (
          <Animated.View
            className={clsx(
              "absolute flex-row items-center flex-wrap",
              { "mt-[5]": multiline },
              { "mt-[12]": multiline && Platform.OS === "android" },
              Platform.OS === "android" && "ml-[4]"
            )}
            style={textTranslateAnim}
          >
            <Animated.Text
              style={[
                textSizeAnim,
                stylesFontFamilyPlaceholderState,
                !value
                  ? { color: placeholderTextColor || colors.greyPlaceholder }
                  : { color: colors.black },
              ]}
              className="text-13 text-greyPlaceholder"
              numberOfLines={1}
            >
              {!isAnimText && !value
                ? placeholder
                : isAnimText
                  ? placeholder
                  : ""}
            </Animated.Text>
          </Animated.View>
        )}
        {!onPress && (
          <TextInput
            value={value}
            placeholderTextColor={placeholderTextColor}
            className={clsx(
              "h-[55] text-13 leading-[16px]",
              !isAnimText && "h-[39]",
              !isAnimText && I18nManager.isRTL && "mt-[9]",
              !!value && !!isAnimText
                ? Platform.OS === "android"
                  ? "pt-[25]"
                  : "pt-[20]"
                : "",
              classNameGuard
            )}
            textAlignVertical={multiline ? "top" : "auto"}
            multiline={multiline}
            style={[
              I18nManager.isRTL && {
                textAlign: "right",
                writingDirection: "rtl",
              },
              style,
              stylesFontFamilyState,
              multiline && styles.multiline,
            ]}
            {...restProps}
          />
        )}
        {onPress && (
          <>
            {/* {!!placeholder && !value && (
              <DmText
                className={clsx(
                  "text-custom400 text-13 leading-[39px]",
                  placeholderTextColor && `text-[${placeholderTextColor}]`,
                  !!label && "leading-[34px]"
                )}
                style={
                  placeholderTextColor ? { color: placeholderTextColor } : {}
                }
              >
                {placeholder}
              </DmText>
            )} */}
            {!!value && (
              <DmView
                className={clsx(
                  "justify-center",
                  isAnimText ? "min-h-[55]" : "min-h-[39]"
                )}
              >
                <DmText
                  className={clsx(
                    "text-custom400 text-13 leading-[22px]",
                    // !!label && "leading-[34px]",
                    isAnimText && "pt-[20]"
                  )}
                >
                  {value}
                </DmText>
              </DmView>
            )}
          </>
        )}
      </DmView>
      {!!IconRight && <DmView className="ml-[14]">{IconRight}</DmView>}
    </DmView>
  )
}

export default DmInput
