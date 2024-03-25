import React from "react"

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
  variant?: "circle" | "square"
}

const DmChecbox: React.FC<Props> = ({
  isChecked,
  onPress,
  title,
  className,
  textClassName,
  variant = "circle",
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
          </>
        )}
        {isChecked && (
          <>
            {variant === "circle" && <CircleCheckBoxCheckedIcon />}

            {variant === "square" && <RentangleChecBoxCheckedIcon />}
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
    </DmView>
  )
}

export default DmChecbox
