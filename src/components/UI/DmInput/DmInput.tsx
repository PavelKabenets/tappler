import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"

import {
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  I18nManager,
  KeyboardTypeOptions,
  ReturnKeyType,
} from "react-native"
import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"

import clsx from "clsx"
import { takeFontFamily, takeFontStyles } from "helpers/helpers"
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
  maxLength?: number
  classNamePlaceholder?: string
  isTextAnimAlways?: boolean
  multilineHeight?: number
  staticPlaceholder?: string
  error?: string
  keyboardType?: KeyboardTypeOptions
  returnKeyType?: ReturnKeyType
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
  maxLength,
  classNamePlaceholder,
  isTextAnimAlways,
  multilineHeight,
  staticPlaceholder,
  error,
  keyboardType,
  returnKeyType,
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
  const { language } = i18n

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
    setStylesFontFamilyState(
      takeFontStyles(
        inputClassName || " font-custom400 leading-[16px]",
        i18n.language
      )
    )
  }, [i18n.language, inputClassName])

  useLayoutEffect(() => {
    if (isTextAnimAlways) {
      setStylesFontFamilyPlaceholderState(
        takeFontStyles(
          inputClassName + " font-custom700 leading-[16px]",
          i18n.language
        )
      )
    }
    if (!isTextAnimAlways) {
      if (value) {
        setStylesFontFamilyPlaceholderState(
          takeFontStyles(
            inputClassName + " font-custom700 leading-[16px]",
            i18n.language
          )
        )
      } else {
        setStylesFontFamilyPlaceholderState(
          takeFontStyles(
            inputClassName + " font-custom400 leading-[16px]",
            i18n.language
          )
        )
      }
    }
  }, [!!value])

  useEffect(() => {
    if (value && isAnimText && !isTextAnimAlways) {
      textSize.value = 11
      if (multiline) {
        if (Platform.OS === "android") {
          textTranslateY.value = -10
        } else {
          textTranslateY.value = -7
        }
      } else {
        if (className?.match(/h-\[(\d+)\]/)?.length) {
          if (className?.match(/h-\[(\d+)\]/)![1]) {
            const res = className?.match(/h-\[(\d+)\]/)![1]
            textTranslateY.value = -(Number(res) / 4.2)
          }
        } else {
          textTranslateY.value = -13
        }
      }
    } else {
      textSize.value = 13
      textTranslateY.value = 0
    }

    if (isTextAnimAlways) {
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
    }
  }, [value])

  return (
    <DmView
      className={clsx(
        "px-[16] border-1 border-grey5 rounded-4 flex-row items-center",
        !!isAnimText && !multiline && "h-[55]",
        !!Icon && "pl-[10] pr-[16]",
        !isAnimText && "h-[39]",
        error && "border-red",
        className
      )}
      onPress={onPress}
    >
      {!!Icon && <DmView className="mr-[14]">{Icon}</DmView>}
      <DmView className={clsx("flex-1", !multiline && "justify-center")}>
        {!!placeholder && !label && (
          <Animated.View
            className={clsx(
              "absolute flex-row items-center flex-wrap",
              { "mt-[8]": multiline },
              { "mt-[12]": multiline && Platform.OS === "android" },
              Platform.OS === "android" && !onPress && "ml-[4]",
              multiline && isTextAnimAlways ? "z-30" : "z-10"
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
                isTextAnimAlways && { color: colors.black },
              ]}
              className={clsx(
                "text-13 flex-1 text-left text-greyPlaceholder",
                multiline && "bg-white",
                classNamePlaceholder
              )}
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
        {!!label && (
          <DmText className="mt-[4] text-11 leading-[14px] font-custom700">
            {label}
          </DmText>
        )}
        {!onPress && (
          <TextInput
            value={value}
            placeholderTextColor={placeholderTextColor}
            className={clsx(
              "h-[55] text-13 leading-[16px] z-10",
              !isAnimText && "h-[39]",
              !isAnimText && I18nManager.isRTL && "mt-[9]",
              (!!value && !!isAnimText) || isTextAnimAlways
                ? Platform.OS === "android"
                  ? "pt-[25]"
                  : "pt-[20]"
                : "",
              classNameGuard
            )}
            textAlignVertical={multiline ? "top" : "auto"}
            numberOfLines={!multiline ? 1 : undefined}
            multiline={multiline}
            placeholder={staticPlaceholder}
            maxLength={multiline ? 299 : maxLength || 49}
            autoCapitalize="none"
            keyboardType={keyboardType}
            returnKeyType={keyboardType === "numeric" ? "done" : "default"}
            style={[
              I18nManager.isRTL && {
                textAlign: "right",
                writingDirection: "rtl",
              },
              style,
              stylesFontFamilyState,
              multiline && styles.multiline,
              !!multilineHeight && { height: multilineHeight },
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
          </>
        )}
      </DmView>
      {!!IconRight && <DmView className="ml-[14]">{IconRight}</DmView>}
    </DmView>
  )
}

export default DmInput
