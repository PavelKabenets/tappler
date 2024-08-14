import React from "react"

import { ActionBtn, DmText, DmView } from "components/UI"

import styles from "./styles"
import { QuoteItemType } from "types"
import clsx from "clsx"
import moment from "moment"
import { I18nManager } from "react-native"
import { useTranslation } from "react-i18next"

interface Props {
  item: QuoteItemType
  className?: string
  onPress: () => void
}

const QuotesItem: React.FC<Props> = ({ item, onPress, className }) => {
  const { t } = useTranslation()

  return (
    <DmView
      className={clsx(
        "py-[19] pl-[16] mr-[19] border-b-1 border-b-grey32",
        className
      )}
      onPress={onPress}
    >
      <DmView className="flex-row justify-between">
        <DmText className="text-13 leading-[16px] font-custom600">
          {moment(item.date).format(
            I18nManager.isRTL ? "YYYY/MM/DD" : "DD/MM/YYYY"
          )}
        </DmText>
        <ActionBtn
          title={t("new")}
          className={clsx("h-[24] w-[77] rounded-5")}
          textClassName="text-11 leading-[14px] font-custom600"
        />
      </DmView>
      <DmText className="mt-[-2] text-13 leading-[16px] font-custom400">
        {t("quote_no")} {item.quoteId}
      </DmText>
      <DmView className="flex-row items-center justify-between">
        {item.status === "draft" && (
          <DmText className="leading-[16px] font-custom400 text-13">
            {t("paid_on")}{" "}
            {moment(item.paidAt).format(
              I18nManager.isRTL ? "YYYY/MM/DD" : "DD/MM/YYYY"
            )}
          </DmText>
        )}
        {(item.status === "converted" || item.status === "active") && (
          <DmText className="leading-[16px] font-custom400 text-13">
            {t("expires_on")}:{" "}
            {moment(item.expirationDate).format(
              I18nManager.isRTL ? "YYYY/MM/DD" : "DD/MM/YYYY"
            )}
          </DmText>
        )}
        {item.status === "expired" && (
          <DmText className="leading-[16px] font-custom400 text-13">
            {t("expired_on")}:{" "}
            {moment(item.expirationDate).format(
              I18nManager.isRTL ? "YYYY/MM/DD" : "DD/MM/YYYY"
            )}
          </DmText>
        )}
        <DmText className="text-13 leading-[16px] font-custom600">
          -{item.price}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default QuotesItem
