import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"

interface Props {
  onPress: () => void
  title: string
}

const ActionBtnSmall: React.FC<Props> = ({ title, onPress }) => {
  return (
    <DmView
      className="py-[8] px-[16] rounded-20 border-1 border-red"
      onPress={onPress}
    >
      <DmText className="text-13 text-center leading-[16px] font-custom600">
        {title}
      </DmText>
    </DmView>
  )
}

export default ActionBtnSmall
