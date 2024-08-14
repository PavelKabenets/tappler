import React from "react"

import { DmText, DmView } from "components/UI"
import { ActivityIndicator } from "react-native"

import { hexToRGBA } from "helpers/helpers"

import styles from "./styles"
import clsx from "clsx"
import colors from "styles/colors"

interface Props {
  onPress?: () => void
  title: string
  className?: string
  disable?: boolean
  isLoading?: boolean
  textClassName?: string
  variant?: "white" | "bordered" | "grey" | "yellow"
  descr?: string
  Icon?: React.ReactNode
  isIconRight?: boolean
  classNameTextWrapper?: string
  classNameIcon?: string
  IconNearTitle?: React.ReactNode
  titleSecond?: string
  reverseItems?: boolean
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
  classNameIcon,
  IconNearTitle,
  titleSecond,
  reverseItems,
}) => {
  return (
    <DmView
      className={clsx(
        "rounded-28 bg-red h-[51] items-center justify-center",
        { "px-[28] flex-row justify-between": !!Icon },
        { "bg-white border-0.5 border-grey2": variant === "white" },
        { "bg-white border-0.5 border-red": variant === "bordered" },
        { "bg-yellow1": variant === "yellow"},
        disable && variant !== "white" && "bg-grey7",
        { "opacity-[0.4]": disable && variant === "white" },
        { "bg-grey28": variant === "grey" },
        className
      )}
      onPress={!disable && !isLoading ? onPress : undefined}
    >
      {!!Icon && !isLoading && (
        <DmView className={clsx(isIconRight && "opacity-0", classNameIcon)}>
          {Icon}
        </DmView>
      )}
      {!isLoading && (
        <DmView
          className={clsx(
            "mx-[12] items-center justify-center",
            !classNameTextWrapper?.match(/flex/) && "flex-1",
            classNameTextWrapper
          )}
        >
          <DmView
            className={clsx(
              "flex-row items-center",
              titleSecond && "w-full justify-between",
              { "flex-row-reverse": reverseItems }
            )}
          >
            <DmText
              className={clsx(
                " text-16 text-white text-center leading-[19px]",
                !textClassName?.match(/font/) && "font-custom500",
                { "text-black": variant === "white" || variant === "yellow" },
                { "text-red": variant === "bordered" },
                textClassName
              )}
            >
              {title}
            </DmText>
            {IconNearTitle && (
              <DmView className="ml-[6]">{IconNearTitle}</DmView>
            )}
            {!!titleSecond && (
              <DmText
                className={clsx(
                  " text-16 text-white text-center leading-[19px]",
                  !textClassName?.match(/font/) && "font-custom500",
                  { "text-black": variant === "white" },
                  { "text-red": variant === "bordered" },
                  textClassName
                )}
              >
                {titleSecond}
              </DmText>
            )}
          </DmView>
          {!!descr && (
            <DmText className="mt-[1] font-custom600 text-13 text-red text-center leading-[16px]">
              {descr}
            </DmText>
          )}
        </DmView>
      )}
      {isLoading && <ActivityIndicator color={colors.white} />}
      {!!Icon && !isLoading && (
        <DmView className={clsx(!isIconRight && "opacity-0", classNameIcon)}>
          {Icon}
        </DmView>
      )}
    </DmView>
  )
}

export default ActionBtn
