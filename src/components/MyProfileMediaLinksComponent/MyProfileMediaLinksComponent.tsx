import React from "react"

import { DmText, DmView } from "components/UI"

import clsx from "clsx"
import styles from "./styles"

interface Props {
  title: string
  className?: string
  Icon: React.ReactNode
}

const MyProfileMediaLinksComponent: React.FC<Props> = ({
  title,
  Icon,
  className,
}) => {
  return (
    <DmView className={clsx("w-[75]", className)}>
      <DmView className="flex-row items-center">
        {Icon}
        <DmText className="ml-[5] text-13 leading-[22px] text-grey45 font-sans400">
          {title}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default MyProfileMediaLinksComponent
