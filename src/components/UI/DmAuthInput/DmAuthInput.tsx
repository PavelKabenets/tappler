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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { useTranslation } from "react-i18next"

import { isSmallPhone, takeFontFamily, takeFontStyles } from "helpers/helpers"

import styles from "./styles"
import clsx from "clsx"
import colors from "styles/colors"
import { fromArabic } from "arabic-digits"

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
  multilineStartOneLine?: boolean
  multilineHeight?: number
  label?: string
  isBorderVisible?: boolean
  translateYStartPos?: number
  onlyTextError?: boolean
  placeholderClassName?: string
  placeholderSize?: number
  textAlign?: "left" | "center" | "right"
  allTextAlign?: "left" | "center" | "right"
  keyboardType?: KeyboardTypeOptions
  returnKeyType?: ReturnKeyType
  onChangeText?: (...event: any[]) => void
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
  multilineStartOneLine,
  multilineHeight,
  label,
  isBorderVisible = true,
  translateYStartPos,
  onlyTextError,
  placeholderClassName,
  placeholderSize = 13,
  textAlign,
  allTextAlign,
  keyboardType,
  returnKeyType,
  onChangeText,
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
  const [styleFont, setFontStyle] = useState({ fontSize: 13 })

  const { i18n } = useTranslation()

  const textSize = useSharedValue(placeholderSize)
  const textTranslateY = useSharedValue(0)
  const marginLeftBorder = useSharedValue(0)

  const classNameGuard = useMemo(() => {
    let initialClassName = inputClassName

    if (inputClassName) {
      if (inputClassName.match(/text-(\d+)/)?.length) {
        const arr = [...inputClassName.match(/text-(\d+)/g) || []]
        arr.map((item) =>
          setFontStyle({ fontSize: Number(item.split("-")[1]) })
        )
        initialClassName = initialClassName?.replace(/text-(\d+)/g, "")
      }
      initialClassName = initialClassName?.replace(/custom(\d{3})/, "")
      initialClassName = initialClassName?.replace(/leading-\[\d+px\]/g, "")
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
    setStylesFontFamilyState(
      takeFontStyles(
        "font-custom400 leading-[16px] " + inputClassName,
        i18n.language
      )
    )
    setStylesFontFamilyPlaceholderState(
      takeFontStyles(
        "font-custom400 leading-[16px] " +
          inputClassName +
          " " +
          placeholderClassName,
        i18n.language
      )
    )
  }, [i18n.language, inputClassName, placeholderClassName])

  useLayoutEffect(() => {
    if (value?.length) {
      setStylesFontFamilyPlaceholderState(
        takeFontFamily(
          "font-custom700 leading-[16px] " + placeholderClassName,
          i18n.language
        )
      )
    } else {
      setStylesFontFamilyPlaceholderState(
        takeFontFamily(
          "font-custom400 leading-[16px] " +
            inputClassName +
            " " +
            placeholderClassName,
          i18n.language
        )
      )
    }
  }, [!!value])

  useEffect(() => {
    if (value && !label) {
      textSize.value = 11
      if (!multiline) {
        textTranslateY.value = -27
      } else {
        textTranslateY.value = -23
      }
      marginLeftBorder.value = 10
    } else {
      textSize.value = placeholderSize
      textTranslateY.value = translateYStartPos || 0
      marginLeftBorder.value = 0
    }
  }, [value, translateYStartPos])

  return (
    <DmView className={clsx(containerClassName)}>
      <DmView
        className={clsx(
          !multiline && "justify-center",
          multiline && Platform.OS === "ios" && "mt-[12]",
          wrapperClassName
        )}
      >
        {!!label && (
          <DmText
            className={clsx(
              "absolute top-[-4] text-11 leading-[14px] font-custom700",
              multiline && "top-[-18]",
              allTextAlign === "center" && "text-center w-full"
            )}
          >
            {label}
          </DmText>
        )}
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
                  ? "mt-[32]"
                  : "mt-[13]"
                : "",
              multilineStartOneLine && Platform.OS === "ios" && "mt-[4]",
              multiline && label && "mt-[2]",
              allTextAlign === "center" && "w-full text-center",
              placeholderClassName
            )}
            style={[
              textSizeAnim,
              stylesFontFamilyPlaceholderState,
              !value
                ? { color: placeholderTextColor || colors.greyPlaceholder }
                : { color: colors.black },
            ]}
          >
            {!!label && !value ? placeholder : !label ? placeholder : ""}
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
              !!Icon && "flex-1",
              onlyTextError && error && "text-red"
            )}
            style={[
              I18nManager.isRTL && {
                textAlign: "right",
                writingDirection: "rtl",
              },
              styleFont,
              style,
              stylesFontFamilyState,
              multiline && !!value && multilineStartOneLine && styles.multiline,
              multiline &&
                !!value &&
                multilineStartOneLine &&
                !!multilineHeight && { height: multilineHeight },
            ]}
            onChangeText={(val) => {
              if (keyboardType === "numeric" || keyboardType === "number-pad") {
                onChangeText?.(fromArabic(val))
              } else {
                onChangeText?.(val)
              }
            }}
            placeholderTextColor={placeholderTextColor}
            multiline={multiline}
            keyboardType={keyboardType}
            returnKeyType={keyboardType === "numeric" ? "done" : "default"}
            autoCapitalize="none"
            textAlign={textAlign || allTextAlign}
          />
          {!!Icon && (
            <DmView className="ml-[12]" onPress={onIconPress}>
              {Icon}
            </DmView>
          )}
        </DmView>
      </DmView>
      {isBorderVisible && (
        <Animated.View
          className={clsx(
            "border-b-0.5 border-grey1",
            !!error && "border-b-red"
          )}
          style={!label && borderAnim}
        />
      )}
      {!!error && !onlyTextError && (
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
