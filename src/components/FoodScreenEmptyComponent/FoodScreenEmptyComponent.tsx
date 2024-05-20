import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import styles from "./styles"

interface Props {
  title: string
  descr?: string
  btnTitle?: string
  onPress?: () => void
  Icon?: React.ReactNode
}

const FoodScreenEmptyComponent: React.FC<Props> = ({
  title,
  descr,
  btnTitle,
  onPress,
  Icon,
}) => {
  return (
    <DmView className="mt-[-24] flex-1 items-center justify-center px-[47]">
      {!!Icon && Icon}
      <DmText className="mt-[26] text-22 leading-[27px] font-custom600">
        {title}
      </DmText>
      {!!descr && (
        <DmText className="mt-[10] text-13 leading-[23px] font-custom500">
          {descr}
        </DmText>
      )}
      {!!btnTitle && (
        <ActionBtn
          title={btnTitle}
          onPress={onPress}
          className="mt-[64] rounded-20 w-full"
          textClassName="font-custom600 text-13 leading-[16px]"
        />
      )}
    </DmView>
  )
}

export default FoodScreenEmptyComponent
