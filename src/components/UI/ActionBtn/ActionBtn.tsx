import React from "react"

import { DmText, DmView } from "components/UI"
import { ActivityIndicator } from "react-native"

import styles from "./styles"
import clsx from "clsx"
import colors from "styles/colors"
import { hexToRGBA } from "helpers/helpers"

interface Props {
  onPress?: () => void
  title: string
  className?: string
  disable?: boolean
  isLoading?: boolean
  textClassName?: string
  variant?: "white" | "bordered"
  descr?: string
  Icon?: React.ReactNode
  isIconRight?: boolean
  classNameTextWrapper?: string
}

const ActionBtn: React.FC<Props> = ({
  title,
  className,
  onPress,
  disable,
  isLoading,
  textClassName,
  variant,
  descr,
  Icon,
  isIconRight,
  classNameTextWrapper,
}) => {
  return (
    <DmView
      className={clsx(
        "rounded-28 bg-red h-[51] items-center justify-center",
        { "px-[28] flex-row justify-between": !!Icon },
        { "bg-white border-0.5 border-grey2": variant === "white" },
        { "bg-white border-0.5 border-red": variant === "bordered" },
        className
      )}
      style={disable ? { backgroundColor: colors.grey7 } : {}}
      onPress={!disable ? onPress : undefined}
    >
      {!!Icon && !isLoading && (
        <DmView className={clsx(isIconRight && "opacity-0")}>{Icon}</DmView>
      )}
      {!isLoading && (
        <DmView
          className={clsx(
            "mx-[12] items-center justify-center",
            !classNameTextWrapper?.match(/flex/) && "flex-1",
            classNameTextWrapper
          )}
        >
          <DmText
            className={clsx(
              " text-16 text-white text-center leading-[19px]",
              !textClassName?.match(/font/) && "font-custom500",
              { "text-black": variant === "white" },
              { "text-red": variant === "bordered" },
              textClassName
            )}
          >
            {title}
          </DmText>
          {!!descr && (
            <DmText className="mt-[1] font-custom600 text-13 text-red text-center leading-[16px]">
              {descr}
            </DmText>
          )}
        </DmView>
      )}
      {isLoading && <ActivityIndicator color={colors.white} />}
      {!!Icon && !isLoading && (
        <DmView className={clsx(!isIconRight && "opacity-0")}>{Icon}</DmView>
      )}
    </DmView>
  )
}

export default ActionBtn
