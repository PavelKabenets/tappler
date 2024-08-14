import React from "react"

import { DmText, DmView } from "components/UI"
import { useTranslation } from "react-i18next"
import { Shadow } from "react-native-shadow-2"

import { hexToRGBA } from "helpers/helpers"
import { MockMessagesDataItemType } from "data/mockData"

import moment from "moment"

import styles from "./styles"
import colors from "styles/colors"
import clsx from "clsx"

interface Props {
  item: MockMessagesDataItemType
}

const MessageComponent: React.FC<Props> = ({ item }) => {
  const { t } = useTranslation()
  const formatTime = (timeString: string) => {
    return moment(timeString, "HH:mm").format("hh:mm A")
  }
  return (
    <DmView className="flex-1 pb-[12]">
      <DmView
        className={clsx(
          "flex pl-[53] pr-[80]",
          item.is_my_message && "flex items-end pr-[49] ml-[80]"
        )}
      >
        <Shadow
          style={{ borderRadius: 10 }}
          distance={item.is_my_message ? 0 : 5}
          startColor={
            item.is_my_message ? "transparent" : hexToRGBA(colors.grey4, 0.1)
          }
        >
          <DmView
            style={
              item.is_my_message
                ? { backgroundColor: hexToRGBA(colors.grey50, 0.25) }
                : {}
            }
            className={clsx(
              "w-full bg-white rounded-10 py-[5] px-[10]",
              item.is_my_message && "rounded-tr-0"
            )}
          >
            <DmView
              className={clsx(
                "w-full",
                item.is_my_message && "w-full flex-row-reverse"
              )}
            >
              <DmText
                className={clsx(
                  "text-12 leading-[20px] font-sans400",
                  item.is_my_message &&
                    "text-11 leading-[19px] font-sans400 text-grey49 px-[10]"
                )}
              >
                {item?.text_message || ""}
              </DmText>
              <DmView className="items-end">
                <DmText className="text-11 leading-[19px] font-sans400 text-grey49 px-[5]">
                  {formatTime(item?.created_at || "")}
                </DmText>
              </DmView>
            </DmView>
            {item.is_my_message && (
              <DmView className="flex items-end mt-[3]">
                <DmView className="w-[19] h-[19] bg-grey" />
              </DmView>
            )}
            <DmView
              style={
                item.is_my_message
                  ? { ...styles.tail, ...styles.myMessageTail }
                  : styles.tail
              }
            />
          </DmView>
        </Shadow>
      </DmView>
      {item.status_offer && (
        <DmView className="flex items-end mt-[12] pr-[29]">
          <DmText className="text-12 leading-[15px] font-custom400 text-red">
            {t("your_offer_has_been_sent_to_customer")}
          </DmText>
          <DmText className="mt-[3] text-9 leading-[11px] font-custom400">
            {formatTime(item?.time_offer || "")}
          </DmText>
        </DmView>
      )}
    </DmView>
  )
}

export default MessageComponent
