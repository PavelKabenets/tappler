import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  className?: string
  title: string
  Icon: React.ReactNode
}

const AccountUpgradesViewElemComponent: React.FC<Props> = ({
  className,
  title,
  Icon,
}) => {
  return (
    <DmView className={clsx("py-[10]", className)}>
      <DmView className="flex-row items-center">
        <DmText className="text-12 leading-[16px] font-sans700 tracking-[0.19]">
          {title}
        </DmText>
        <DmView className="px-[10]">{Icon}</DmView>
      </DmView>
    </DmView>
  )
}

export default AccountUpgradesViewElemComponent
