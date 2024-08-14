import React, { useState } from "react"

import { DmText, DmView } from "components/UI"

import { MockMainNotificationsDataItemType } from "data/mockData"
import moment from "moment"

import styles from "./styles"
import clsx from "clsx"
import { NotificationsItemType } from "types"

interface Props {
  item: NotificationsItemType
  classNameTime?: string
  classNameTitle?: string
  classNameSubtitle?: string
  onPress?: (item: NotificationsItemType) => void
  isSelected?: boolean
}

const NotificationsComponent: React.FC<Props> = ({
  item,
  classNameTime,
  classNameTitle,
  classNameSubtitle,
  onPress,
  isSelected,
}) => {
  const handlePress = (item: NotificationsItemType) => {
    if (onPress) {
      onPress(item)
    }
    // setIsPressed((prev) => ({ ...prev, [item.created_at]: true }))
  }

  const formatDate = (date: string) => {
    const dateMoment = moment(date)
    const today = moment()

    if (dateMoment.isSame(today, "day")) {
      return `Today ${dateMoment.format("h:mm A")}`
    }
    return dateMoment.format("DD/MM/YYYY")
  }

  return (
    <DmView
      onPress={() => handlePress(item)}
      className="px-[15] py-[21] border-b-1 border-grey4"
    >
      <DmText
        className={clsx(
          "mb-[5] text-12 leading-[15px] font-custom700",
          !isSelected && "font-custom400",
          classNameTime
        )}
      >
        {formatDate(item.createdAt)}
      </DmText>
      <DmText
        className={clsx(
          "mb-[5] text-13 leading-[16px] font-custom700",
          !isSelected && "font-custom400",

          classNameTitle
        )}
      >
        {item.title}
      </DmText>
      <DmText
        className={clsx(
          "text-12 leading-[15px] font-custom700",
          !isSelected && "font-custom400",

          classNameSubtitle
        )}
      >
        {item.body}
      </DmText>
    </DmView>
  )
}

export default NotificationsComponent
