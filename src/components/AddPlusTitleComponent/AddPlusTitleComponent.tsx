import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import PlusIcon from "assets/icons/plus.svg"
import colors from "styles/colors"
import clsx from "clsx"

interface Props {
  title: string
  onPress: () => void
  className?: string
}

const AddPlusTitleComponent: React.FC<Props> = ({
  title,
  onPress,
  className,
}) => {
  return (
    <DmView
      className={clsx("px-[14] py-[16] flex-row items-center", className)}
      onPress={onPress}
    >
      <DmView className="mr-[7] w-[20] h-[20] rounded-full bg-red justify-center items-center">
        <PlusIcon width={16} height={16} color={colors.white} strokeWidth={3} />
      </DmView>
      <DmText className="text-13 leading-[16px] font-custom600">{title}</DmText>
    </DmView>
  )
}

export default AddPlusTitleComponent
