import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"
import { I18nManager } from "react-native"

interface Props {
  title: string
  className?: string
  descr: string
  subTitle?: string
  onPress?: () => void
}

const ScoreComponent: React.FC<Props> = ({
  title,
  className,
  descr,
  subTitle,
  onPress,
}) => {
  return (
    <DmView
      className={clsx("pt-[4] pb-[9] px-[10] bg-grey2 rounded-4", className)}
      onPress={onPress}
    >
      <DmView className="flex-row items-center justify-center">
        <DmText className="text-22 leading-[27px] text-white font-custom600 text-center">
          {title}{" "}
        </DmText>
        {!!subTitle && (
          <DmView className="absolute right-[0]">
            <DmText className="text-8 leading-[10px] text-white font-custom600">
              {" "}
              {subTitle}
            </DmText>
          </DmView>
        )}
      </DmView>
      <DmText
        className={clsx(
          "text-12 leading-[15px] text-white font-custom500 text-center",
          I18nManager.isRTL && "mt-[-8]",
          I18nManager.isRTL && "text-10 leading-[13px]"
        )}
        numberOfLines={1}
      >
        {descr}
      </DmText>
    </DmView>
  )
}

export default ScoreComponent
