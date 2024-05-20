import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import CloseIcon from "assets/icons/close.svg"
import clsx from "clsx"

interface Props {
  title: string
  onPress?: (item: string) => void
  className?: string
}

const SelectableBtn: React.FC<Props> = ({ title, onPress, className }) => {
  return (
    <DmView
      className={clsx(
        "px-[9] h-[29] bg-pink rounded-full border-1 border-red self-start items-center justify-center flex-row",
        className
      )}
      onPress={() => onPress?.(title)}
    >
      <DmText className="mr-[5] text-13 leading-[16px] font-custom500 text-red">
        {title}
      </DmText>
      <CloseIcon width={9} height={9} />
    </DmView>
  )
}

export default SelectableBtn
