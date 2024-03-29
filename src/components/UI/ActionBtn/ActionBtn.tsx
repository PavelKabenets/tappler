import React from "react"

import { DmText, DmView } from "components/UI"
import { ActivityIndicator } from "react-native"

import styles from "./styles"
import clsx from "clsx"
import colors from "styles/colors"
import { hexToRGBA } from "helpers/helpers"

interface Props {
  onPress: () => void
  title: string
  className?: string
  disable?: boolean
  isLoading?: boolean
  textClassName?: string
  variant?: "white" | "bordered"
  descr?: string
  Icon?: React.ReactNode
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
}) => {
  return (
    <DmView
      className={clsx(
        "rounded-28 bg-red h-[51] items-center justify-center",
        { "px-[28] flex-row justify-between": !!Icon },
        className,
        { "bg-white border-0.5 border-grey2": variant === "white" },
        { "bg-white border-0.5 border-red": variant === "bordered" }
      )}
      style={disable ? { backgroundColor: colors.grey7 } : {}}
      onPress={!disable ? onPress : undefined}
    >
      {!!Icon && <DmView className="">{Icon}</DmView>}
      {!isLoading && (
        <DmView className="mx-[12] items-center justify-center flex-1">
          <DmText
            className={clsx(
              " text-16 text-white text-center",
              !textClassName?.match(/font/) && "font-custom500",
              textClassName,
              { "text-black": variant === "white" },
              { "text-red": variant === "bordered" }
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
      {!!Icon && <DmView className="opacity-0">{Icon}</DmView>}
    </DmView>
  )
}

export default ActionBtn
