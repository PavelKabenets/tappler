import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"
import { useTranslation } from "react-i18next"

interface Props {
  onActionBtnPress?: () => void
  onWhiteBtnPress?: () => void
  titleActionBtn?: string
  titleWhiteBtn?: string
  className?: string
  classNameBtns?: string
  classNameBtnsText?: string
  classNameActionBtn?: string
  classNameSecondBtn?: string
  classNameActionBtnText?: string
  classNameSecondBtnText?: string
  isLoading?: boolean
}

const BtnsRentangle: React.FC<Props> = ({
  onActionBtnPress,
  onWhiteBtnPress,
  titleActionBtn,
  titleWhiteBtn,
  className,
  classNameBtns,
  classNameBtnsText,
  classNameActionBtn,
  classNameSecondBtn,
  classNameActionBtnText,
  classNameSecondBtnText,
  isLoading,
}) => {
  const { t } = useTranslation()
  return (
    <DmView
      className={clsx("flex-row items-center justify-between", className)}
    >
      <ActionBtn
        className={clsx(
          "flex-1 mr-[7.5] h-[30] rounded-3 border-black",
          classNameBtns,
          classNameSecondBtn
        )}
        title={titleWhiteBtn || t("no")}
        onPress={onWhiteBtnPress}
        variant="white"
        textClassName={clsx(
          "text-red text-13 leading-[20px]",
          !(
            classNameBtnsText?.match(/font/) ||
            classNameSecondBtnText?.match(/font/)
          ) && "font-custom600",
          classNameBtnsText,
          classNameSecondBtnText
        )}
        classNameTextWrapper="mx-0"
        disable={isLoading}
      />
      <ActionBtn
        className={clsx(
          "flex-1 ml-[7.5] h-[30] rounded-3",
          classNameBtns,
          classNameActionBtn
        )}
        title={titleActionBtn || t("yes")}
        onPress={onActionBtnPress}
        textClassName={clsx(
          "text-13 leading-[20px]",
          !(
            classNameBtnsText?.match(/font/) ||
            classNameActionBtnText?.match(/font/)
          ) && "font-custom600",
          classNameBtnsText,
          classNameActionBtnText
        )}
        classNameTextWrapper="mx-0"
        isLoading={isLoading}
        disable={isLoading}
      />
    </DmView>
  )
}

export default BtnsRentangle
