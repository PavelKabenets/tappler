import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  onActionBtnPress?: () => void
  onWhiteBtnPress?: () => void
  titleActionBtn?: string
  titleWhiteBtn?: string
  className?: string
  classNameBtns?: string
  classNameBtnsText?: string
}

const BtnsRentangle: React.FC<Props> = ({
  onActionBtnPress,
  onWhiteBtnPress,
  titleActionBtn,
  titleWhiteBtn,
  className,
  classNameBtns,
  classNameBtnsText,
}) => {
  return (
    <DmView
      className={clsx("flex-row items-center justify-between", className)}
    >
      <ActionBtn
        className={clsx(
          "flex-1 mr-[7.5] h-[30] rounded-3 border-black",
          classNameBtns
        )}
        title={titleWhiteBtn || ""}
        onPress={onWhiteBtnPress}
        variant="white"
        textClassName="text-red font-custom600 text-13 leading-[20px]"
        classNameTextWrapper="mx-0"
      />
      <ActionBtn
        className={clsx("flex-1 ml-[7.5] h-[30] rounded-3", classNameBtns)}
        title={titleActionBtn || ""}
        onPress={onActionBtnPress}
        textClassName="font-custom600 text-13 leading-[20px]"
        classNameTextWrapper="mx-0"
      />
    </DmView>
  )
}

export default BtnsRentangle
