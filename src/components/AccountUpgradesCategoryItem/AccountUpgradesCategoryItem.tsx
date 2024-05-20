import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  title: string
  Icon: React.ReactNode
  className?: string
  isActive?: boolean
  onPress: () => void
}

const AccountUpgradesCategoryItem: React.FC<Props> = ({
  title,
  Icon,
  className,
  isActive,
  onPress,
}) => {
  return (
    <DmView
      className={clsx(
        "items-center rounded-10 py-[11] border-1 border-grey34",
        isActive && "border-red",
        className
      )}
      style={styles.item}
      onPress={onPress}
    >
      {Icon}
      <DmText className="mt-[10] text-12 leading-[15px] font-custom600">
        {title}
      </DmText>
    </DmView>
  )
}

export default AccountUpgradesCategoryItem
