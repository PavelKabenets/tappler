import React, { useLayoutEffect, useMemo, useState } from "react"

// Components
import { Pressable, StyleProp, Text, TextProps, TextStyle } from "react-native"

import { useTranslation } from "react-i18next"

import { takeFontFamily } from "helpers/helpers"

// Styles & Assets
import clsx from "clsx"
import styles from "./styles"

interface Props extends TextProps {
  onPress?: () => void
  style?: StyleProp<TextStyle>
}

const DmText: React.FC<Props> = ({
  onPress,
  className,
  children,
  style,
  ...restProps
}) => {
  const Wrapper = onPress ? Pressable : React.Fragment
  const [stylesFontFamilyState, setStylesFontFamilyState] = useState<
    | {
        fontFamily?: string
        lineHeight?: number
      }
    | undefined
  >(undefined)

  const { i18n } = useTranslation()

  const classNameGuard = useMemo(() => {
    let initialClassName = "text-14 text-black text-left "

    if (className) {
      initialClassName += className.replace(/custom(\d{3})/, "")
    }

    return initialClassName
  }, [className, i18n.language])

  useLayoutEffect(() => {
    if (className) {
      setStylesFontFamilyState(takeFontFamily(className, i18n.language))
    }
  }, [className, i18n.language])

  return (
    <Wrapper>
      <Text
        className={classNameGuard}
        style={[style, stylesFontFamilyState]}
        {...restProps}
      >
        {children}
      </Text>
    </Wrapper>
  )
}

export default DmText
