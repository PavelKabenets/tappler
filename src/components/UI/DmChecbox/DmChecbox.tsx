import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  isChecked?: boolean
  onPress?: () => void
  title?: string
  className?: string
  textClassName?: string
}

const DmChecbox: React.FC<Props> = ({
  isChecked,
  onPress,
  title,
  className,
  textClassName,
}) => {
  return (
    <DmView
      className={clsx("flex-row items-center", className)}
      onPress={onPress}
    >
      <DmView className="mr-[9]">
        {/* @TO DO */}
        {!isChecked && (
          <DmView className="w-[22] h-[22] bg-grey rounded-full" />
        )}
        {/* @TO DO */}
        {isChecked && <DmView className="w-[22] h-[22] bg-red rounded-full" />}
      </DmView>
      {!!title && (
        <DmText
          className={clsx(
            "text-15 flex-1",
            { "font-custom500": !textClassName?.match(/font-/) },
            textClassName
          )}
        >
          {title}
        </DmText>
      )}
    </DmView>
  )
}

export default DmChecbox
