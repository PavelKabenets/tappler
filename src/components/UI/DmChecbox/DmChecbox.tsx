import React, { Children } from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"
import RentangleChecBoxIcon from "assets/icons/rentangle-checkbox.svg"
import RentangleChecBoxCheckedIcon from "assets/icons/rentangle-checkbox-checked.svg"
import CircleCheckBoxIcon from "assets/icons/circle-checkbox.svg"
import CircleCheckBoxCheckedIcon from "assets/icons/circle-checkbox-checked.svg"

interface Props {
  isChecked?: boolean
  onPress?: () => void
  title?: string
  className?: string
  textClassName?: string
  variant?: "circle" | "square" | "custom"
  children?: React.ReactNode
}

const DmChecbox: React.FC<Props> = ({
  isChecked,
  onPress,
  title,
  className,
  textClassName,
  variant = "circle",
  children,
}) => {
  return (
    <DmView
      className={clsx("flex-row items-center", className)}
      onPress={onPress}
    >
      <DmView className="mr-[9]">
        {!isChecked && (
          <>
            {variant === "circle" && <CircleCheckBoxIcon />}

            {variant === "square" && <RentangleChecBoxIcon />}

            {variant === "custom" && (
              <DmView className="w-[26] h-[26] rounded-full border-1 border-black" />
            )}
          </>
        )}
        {isChecked && (
          <>
            {variant === "circle" && <CircleCheckBoxCheckedIcon />}

            {variant === "square" && <RentangleChecBoxCheckedIcon />}

            {variant === "custom" && (
              <DmView className="w-[26] h-[26] rounded-full border-1 border-black items-center justify-center">
                <DmView className="w-[16] h-[16] rounded-full bg-red" />
              </DmView>
            )}
          </>
        )}
      </DmView>
      {!!title && (
        <DmText
          className={clsx(
            "text-15",
            { "font-custom500": !textClassName?.match(/font-/) },
            textClassName
          )}
        >
          {title}
        </DmText>
      )}
      {children}
    </DmView>
  )
}

export default DmChecbox
