import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"

import styles from "./styles"
import clsx from "clsx"
import { I18nManager } from "react-native"
import { isSmallPhone } from "helpers/helpers"

interface Props {
  Icon?: React.ReactNode
  title: string
  descr?: string
  onPress: () => void
  isComplete?: boolean
  className?: string
  btnTitle?: string
  btnVariant?: "white" | "bordered" | "grey" | "yellow"
}

const DashboardCategoryItem: React.FC<Props> = ({
  Icon,
  title,
  descr,
  onPress,
  isComplete,
  className,
  btnTitle,
  btnVariant,
}) => {
  const { t } = useTranslation()
  return (
    <DmView
      className={clsx(
        "py-[13] px-[14] rounded-5 border-0.7 border-grey15 items-center justify-center",
        className
      )}
      style={styles.item}
      onPress={onPress}
    >
      {!!Icon && <DmView className="mb-[8] items-center h-[36]">{Icon}</DmView>}
      <DmText className="text-13 leading-[16px] text-black font-custom700 text-center">
        {title}
      </DmText>
      {!!descr && !!isComplete && (
        <DmText
          className={clsx(
            "mt-[6] text-13 leading-[16px] font-custom400 text-center",
            isSmallPhone && "text-12"
          )}
        >
          {descr}
        </DmText>
      )}
      {!isComplete && (
        <ActionBtn
          title={t(btnTitle || "incomplete")}
          className="mt-[8] h-[22]"
          variant={btnVariant}
          textClassName={clsx(
            "text-11 leading-[14px] font-custom500",
            I18nManager.isRTL && "mt-[-2]"
          )}
        />
      )}
    </DmView>
  )
}

export default DashboardCategoryItem
