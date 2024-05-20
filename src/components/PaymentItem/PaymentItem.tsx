import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  title: string
  Icons?: React.ReactNode[]
  className?: string
  onPress: () => void
}

const PaymentItem: React.FC<Props> = ({ title, Icons, className, onPress }) => {
  return (
    <DmView
      className={clsx(
        "px-[15] py-[16] flex-row items-center border-t-0.5 border-t-grey31",
        className
      )}
      onPress={onPress}
    >
      <DmView className="flex-row items-center">
        {Icons?.map((item, idx) => (
          <DmView className="mr-[12]" key={idx}>
            {item}
          </DmView>
        ))}
      </DmView>
      <DmText className="flex-1 text-13 leading-[16px] font-custom500">
        {title}
      </DmText>
    </DmView>
  )
}

export default PaymentItem
