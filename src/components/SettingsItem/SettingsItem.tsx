import React, { Dispatch, SetStateAction } from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import ChevronRight from "assets/icons/chevron-right.svg"
import colors from "styles/colors"
import clsx from "clsx"
import { I18nManager } from "react-native"

interface Props {
  title: string
  Icon?: React.ReactNode
  titleChevron?: string
  mode?: "default" | "toggle" | "none"
  isToggleViisible?: boolean
  setToggleVisible?: Dispatch<SetStateAction<boolean>>
  className?: string
  textVariant?: "default" | "red"
  onPress?: () => void
  classNameTitleChevron?: string
}

const SettingsItem: React.FC<Props> = ({
  title,
  Icon,
  titleChevron,
  mode = "default",
  isToggleViisible,
  setToggleVisible,
  textVariant = "default",
  className,
  onPress,
  classNameTitleChevron,
}) => {
  return (
    <DmView
      className={clsx(
        "flex-row items-center justify-between border-b-1 border-b-grey19 h-[50] pl-[24]",
        className
      )}
      onPress={onPress}
    >
      <DmView className="flex-row items-center">
        {!!Icon && (
          <DmView className="w-[50] flex-start">
            <DmView
              className={clsx(
                I18nManager.isRTL && "rotate-[180deg] scale-y-[-1] items-end"
              )}
            >
              {Icon}
            </DmView>
          </DmView>
        )}
        <DmText
          className={clsx(
            "text-13 leading-[16px] font-custom500",
            textVariant === "red" && "text-red"
          )}
        >
          {title}
        </DmText>
      </DmView>
      <DmView className="flex-row items-center">
        {titleChevron && (
          <DmText
            className={clsx(
              "mr-[6] text-13 leading-[16px] font-custom400 text-black",
              textVariant === "red" && "text-red",
              classNameTitleChevron
            )}
          >
            {titleChevron}
          </DmText>
        )}
        {mode === "default" && (
          <DmView className="flex-end">
            <DmView className={clsx(I18nManager.isRTL && "rotate-[180deg]")}>
              <ChevronRight color={colors.grey20} width={18} height={18} />
            </DmView>
          </DmView>
        )}
      </DmView>
    </DmView>
  )
}

export default SettingsItem