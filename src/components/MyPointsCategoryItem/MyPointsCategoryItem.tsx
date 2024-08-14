import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  title: string
  Icon: React.ReactNode
  onPress: () => void
  className?: string
}

const MyPointsCategoryItem: React.FC<Props> = ({
  title,
  Icon,
  onPress,
  className,
}) => {
  return (
    <DmView
      className={clsx(
        "items-center justify-center pt-[11] pb-[5] rounded-10 border-1 border-grey40",
        className
      )}
      style={styles.item}
      onPress={onPress}
    >
      {Icon}
      <DmText className="mt-[4] text-13 leading-[16px] font-custom500 text-center">
        {title.split(" ").join("\n")}
      </DmText>
    </DmView>
  )
}

export default MyPointsCategoryItem
