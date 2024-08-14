import React from "react"

import { DmText, DmView } from "components/UI"

import styles from "./styles"
import moment from "moment"
import clsx from "clsx"
import { PointsTransactionsHistoryType } from "types"
import { useTranslation } from "react-i18next"

interface Props {
  item: PointsTransactionsHistoryType
}

const MyPointsActivityItem: React.FC<Props> = ({ item }) => {
  const cost = item.amountAfter - item.amountBefore
  const { t } = useTranslation()
  return (
    <DmView className="flex-row justify-between items-center py-[18] pr-[17] border-b-1 border-b-grey29">
      <DmView className="flex-[2]">
        <DmText className="text-11 leading-[14px] font-custom600">
          {t("points")} {t(item.type)}
        </DmText>
        <DmText className="mt-[3] text-11 leading-[14px] font-custom400">
          {moment(item.date).format("DD/MM/YYYY hh:mmA")}
        </DmText>
      </DmView>
      <DmView className="flex-1">
        {/* <DmText
          className={clsx(
            "text-11 leading-[14px] font-custom400 text-black",
            item === "expired" && "text-red",
            item.status === "done" && "opacity-0"
          )}
        >
          {t(item.status)}
        </DmText> */}
      </DmView>
      <DmView className="flex-1 items-end">
        <DmText
          className={clsx(
            "text-13 leading-[16px] font-custom600 text-green1",
            cost < 0 && "text-red",
            // item.status === "expired" && "line-through"
          )}
        >
          {cost > 0 ? "+" : ""}
          {cost}
        </DmText>
      </DmView>
    </DmView>
  )
}

export default MyPointsActivityItem
