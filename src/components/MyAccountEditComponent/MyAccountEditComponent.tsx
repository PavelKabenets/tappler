import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  title: string
  button: string
  descr: string
  last?: boolean
  classNameDescr?: string
  onPress: () => void
}

const MyAccountEditComponent: React.FC<Props> = ({
  title,
  button,
  descr,
  last,
  onPress,
  classNameDescr,
}) => {
  return (
    <DmView
      className={`mx-[22] py-[13] ${last ? "" : "border-b-1 border-grey4"}`}
      onPress={onPress}
    >
      <DmView className="flex-row justify-between">
        <DmText className="text-16 leading-[19px] font-custom600 text-black">
          {title}
        </DmText>
        <DmText className="text-15 leading-[19px] font-custom400 text-black underline">
          {button}
        </DmText>
      </DmView>
      <DmText
        className={clsx(
          "text-15 leading-[19px] font-custom400 text-black mt-[10]",
          classNameDescr
        )}
      >
        {descr}
      </DmText>
    </DmView>
  )
}

export default MyAccountEditComponent
