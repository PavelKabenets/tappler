import React, { useState } from "react"

import { DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import { MockMessagesDataItemType } from "data/mockData"
import moment from "moment"
import "moment/locale/ar"

import styles from "./styles"
import clsx from "clsx"

interface Props {
  item: MockMessagesDataItemType
  classNameTime?: string
  classNameTitle?: string
  classNameSubtitle?: string
  onPress?: (item: MockMessagesDataItemType) => void
}

const MessagesComponent: React.FC<Props> = ({
  item,
  classNameTime,
  classNameTitle,
  classNameSubtitle,
  onPress,
}) => {
  const [isPressed, setIsPressed] = useState<{ [key: string]: boolean }>({})
  const { t, i18n } = useTranslation()

  const handlePress = (item: MockMessagesDataItemType) => {
    if (onPress) {
      onPress(item)
    }
    setIsPressed((prev) => ({ ...prev, [item.created_at]: true }))
  }

  const formatDate = (date: string, currentLanguage: string) => {
    const dateMoment = moment(date)
    const today = moment()
    const yesterday = moment().subtract(1, "days")

    if (dateMoment.isSame(today, "day")) {
      return `${dateMoment.format("h:mm A")}`
    }
    if (dateMoment.isSame(yesterday, "day")) {
      return t("yesterday")
    }
    if (currentLanguage === "ar") {
      return dateMoment.format("YYYY/MM/DD")
    }
    return dateMoment.format("DD/MM/YYYY")
  }

  return (
    <DmView
      key={item.created_at}
      onPress={() => handlePress(item)}
      className="px-[15] pt-[10] pb-[13] border-b-1 border-grey4"
    >
      <DmView className="flex-row justify-between items-center">
        <DmText
          className={clsx(
            "text-15 leading-[19px] font-custom600",
            classNameTitle
          )}
        >
          {item.sender}
        </DmText>
        <DmView className="mr-[5]">
          <DmText
            className={clsx(
              "text-11 leading-[14px] font-custom400",
              classNameTime
            )}
          >
            {formatDate(item.created_at, i18n.language)}
          </DmText>
        </DmView>
      </DmView>
      <DmView className="mt-[5]">
        <DmText
          className={clsx(
            "text-13 leading-[16px] font-custom500",
            classNameTitle
          )}
        >
          {item.title}
        </DmText>
      </DmView>
      <DmView className="mt-[5]">
        <DmText
          className={clsx(
            "text-11 leading-[14px] font-custom400",
            classNameSubtitle
          )}
        >
          {item.subtitle}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default MessagesComponent
