import React, { useLayoutEffect, useMemo, useState } from "react"

import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native"
import { DmText, DmView } from "components/UI"

import { useTranslation } from "react-i18next"

import styles from "./styles"
import {
  renderMontserratFontFamily,
  renderSansFontFamily,
} from "utils/renderFontFamily"
import clsx from "clsx"

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
  ...restProps
}) => {
  const [stylesFontFamilyState, setStylesFontFamilyState] = useState<{
    fontFamily: string
  }>({
    fontFamily: "Montserrat-Regular",
  })

  const { i18n } = useTranslation()
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

  return (
    <DmView
      className={clsx(
        "px-[16] border-1 border-grey5 rounded-4 flex-row items-center",
        !!Icon && "pl-[10] pr-[16]",
        { "h-[39]": onPress && !label },
        { "min-h-[39]": onPress && !!label },
        className
      )}
      onPress={onPress}
    >
      {!!Icon && <DmView className="mr-[14]">{Icon}</DmView>}
      <DmView className="flex-1">
        {!!label && (
          <DmText className="mt-[5] text-11 font-custom700">{label}</DmText>
        )}
        {!onPress && (
          <TextInput
            value={value}
            placeholderTextColor={placeholderTextColor}
            className={clsx("h-[39]", !!label && "h-[34]", classNameGuard)}
            multiline={multiline}
            style={[
              style,
              stylesFontFamilyState,
              multiline && styles.multiline,
            ]}
            placeholder={placeholder}
            {...restProps}
          />
        )}
        {onPress && (
          <>
            {!!placeholder && !value && (
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
            )}
            {!!value && (
              <DmText
                className={clsx(
                  "text-custom400 text-13 leading-[39px]",
                  !!label && "leading-[34px]"
                )}
              >
                {value}
              </DmText>
            )}
          </>
        )}
      </DmView>
      {!!IconRight && <DmView className="ml-[14]">{IconRight}</DmView>}
    </DmView>
  )
}

export default DmInput
