/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react"

// Components
import {
  View,
  ViewProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

// Styles
import styles from "./styles"

interface Props extends ViewProps, TouchableOpacityProps {
  className?: string
  keyboardShouldPersistTaps?: "always" | "never" | "handled"
}

const DmView: React.FC<Props> = ({
  onPress,
  className,
  children,
  keyboardShouldPersistTaps,
  ...restProps
}) => {
  const Wrapper = onPress ? TouchableOpacity : View

  return (
    // @ts-ignore
    <Wrapper
      className={className}
      onPress={onPress}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      {...restProps}
    >
      {children}
    </Wrapper>
  )
}

export default DmView
